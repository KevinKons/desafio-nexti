package com.desafio.nexti.desafionexti.service;

import com.desafio.nexti.desafionexti.exceptions.EntityAlreadyRegisteredException;
import com.desafio.nexti.desafionexti.model.Client;
import com.desafio.nexti.desafionexti.repositories.ClientRepository;
import com.desafio.nexti.desafionexti.validators.GeneralValidations;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ClientServiceTest {

    @Autowired
    private ClientService clientService;

    @MockBean
    private ClientRepository clientRepository;

    @MockBean
    private GeneralValidations generalValidations;

    @Test
    @DisplayName("createClient - When CPF is not registered should save Client")
    public void test01() throws Exception {
        Client client = new Client(1L, "16578489625", "Carlos", LocalDate.of(1988, 7, 05));

        clientService.createClient(client);

        verify(clientRepository, times(1)).existsByCpf(client.getCpf());
        verify(clientRepository, times(1)).save(client);
    }

    @Test
    @DisplayName("createClient - When CPF is registered should throw exception")
    public void test02() throws EntityAlreadyRegisteredException {
        Client client = new Client(1L, "16578489625", "Carlos", LocalDate.of(1988, 7, 05));
        doReturn(true).when(clientRepository).existsByCpf(client.getCpf());

        assertThrows(EntityAlreadyRegisteredException.class, () -> {
            clientService.createClient(client);
        });

        verify(clientRepository, times(0)).save(client);
    }

    @Test
    @DisplayName("deleteClient - When client exists should delete")
    public void test03() throws NoSuchElementException {
        long clientId = 1L;
        doReturn(true).when(clientRepository).existsById(clientId);

        clientService.deleteClient(clientId);

        verify(clientRepository, times(1)).existsById(clientId);
        verify(clientRepository, times(1)).deleteById(clientId);
    }

    @Test
    @DisplayName("deleteClient - When client doesnt exists should throw NoSuchElementException")
    public void test04() throws NoSuchElementException {
        long clientId = 1L;
        doReturn(false).when(clientRepository).existsById(clientId);

        assertThrows(NoSuchElementException.class, () -> {
            clientService.deleteClient(clientId);
        });

        verify(clientRepository, times(1)).existsById(clientId);
        verify(clientRepository, times(0)).deleteById(clientId);
    }

    @Test
    @DisplayName("findClients - Should return client list")
    public void test05() {
        List<Client> clients = Arrays.asList(
                new Client(1L, "16578489625", "Carlos", LocalDate.of(1988, 7, 05)),
                new Client(2L, "16578489624", "José", LocalDate.of(1988, 7, 05))
        );
        doReturn(clients).when(clientRepository).findAll();

        List<Client> result = clientService.findClients();

        verify(clientRepository, times(1)).findAll();
        assertEquals(clients.size(), result.size());
    }

    @Test
    @DisplayName("findClient - When client doesnt exist should throw no SuchElementException")
    public void test06() {
        doReturn(Optional.empty()).when(clientRepository).findByCpf(any());
        String cpf = "45185674852";

        assertThrows(NoSuchElementException.class, () -> {
           clientService.findClient(cpf);
        });

        verify(clientRepository, times(1)).findByCpf(cpf);
    }

    @Test
    @DisplayName("findClient - When client exists should find client")
    public void test07() {
        Client client = new Client(1L, "16578489625", "Carlos", LocalDate.of(1988, 7, 05));
        doReturn(Optional.of(client)).when(clientRepository).findByCpf(client.getCpf());

        Client result = clientService.findClient(client.getCpf());

        verify(clientRepository, times(1)).findByCpf(client.getCpf());
        assertEquals(client.getId(), result.getId());
    }

    @Test
    @DisplayName("editClient - When client doesnt exist should throw NoSuchElementException")
    public void test08() {
        long clientId = 1L;
        Client client = new Client(clientId, "16578489625", "Carlos", LocalDate.of(1988, 7, 05));
        doReturn(Optional.empty()).when(clientRepository).findById(clientId);

        assertThrows(NoSuchElementException.class, () -> {
            clientService.editClient(client);
        });

        verify(clientRepository, times(1)).findById(clientId);
        verify(clientRepository, times(0)).save(client);
    }

    @Test
    @DisplayName("editClient - When client wasnt modified shouldnt save client")
    public void test09() {
        Client client = new Client(1L, "16578489625", "Carlos", LocalDate.of(1988, 7, 05));
        doReturn(Optional.of(client)).when(clientRepository).findById(client.getId());

        clientService.editClient(client);

        verify(clientRepository, times(1)).findById(client.getId());
        verify(clientRepository, times(0)).save(client);
    }

    @Test
    @DisplayName("editClient - When client is modified should save client with new information")
    public void test10() {
        Client client = new Client(1L, "16578489625", "Carlos", LocalDate.of(1988, 7, 05));
        Client alteredClient = new Client(1L, "16578489623", "Carlos Alberto", LocalDate.of(1988, 8, 05));
        doReturn(Optional.of(client)).when(clientRepository).findById(client.getId());

       clientService.editClient(alteredClient);

       verify(clientRepository, times(1)).findById(client.getId());
       verify(clientRepository, times(1)).save(client);
    }

}