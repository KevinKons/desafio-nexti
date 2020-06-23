package com.desafio.nexti.desafionexti.service;

import com.desafio.nexti.desafionexti.exceptions.EntityAlreadyRegisteredException;
import com.desafio.nexti.desafionexti.model.Client;
import com.desafio.nexti.desafionexti.repositories.ClientRepository;
import com.desafio.nexti.desafionexti.validators.GeneralValidations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private GeneralValidations generalValidations;

    public static final String NOT_FOUND_MESSAGE = "Client not found";
    public static final String CPF_ALREADY_REGISTERED_MESSAGE = "CPF already registered";

    public Client createClient(Client client) throws Exception {
        generalValidations.validateIdZeroOrNull(client.getId());
        if(clientRepository.existsByCpf(client.getCpf()))
            throw new EntityAlreadyRegisteredException(CPF_ALREADY_REGISTERED_MESSAGE);
        return clientRepository.save(client);
    }

    public void deleteClient(long id) throws NoSuchElementException{
        if(clientRepository.existsById(id))
            clientRepository.deleteById(id);
        else
            throw new NoSuchElementException(NOT_FOUND_MESSAGE);
    }

    public List<Client> findClients() {
        return clientRepository.findAll();
    }

    public Client findClient(String cpf) throws NoSuchElementException {
        Optional<Client> optClient = clientRepository.findByCpf(cpf);
        if(!optClient.isPresent())
            throw new NoSuchElementException(NOT_FOUND_MESSAGE);
        return optClient.get();
    }

    public Client editClient(Client client) throws NoSuchElementException {
        Client persistentClient = clientRepository.findById(client.getId())
                .orElseThrow(() -> new NoSuchElementException(NOT_FOUND_MESSAGE));

        boolean wasModified = false;
        if(!client.getCpf().equals(persistentClient.getCpf())) {
            persistentClient.setCpf(client.getCpf());
            wasModified = true;
        }
        if(!client.getName().equals(persistentClient.getName())){
            persistentClient.setName(client.getName());
            wasModified = true;
        }
        if(!client.getBirthday().equals(persistentClient.getBirthday())) {
            persistentClient.setBirthday(client.getBirthday());
            wasModified = true;
        }

        return wasModified ? clientRepository.save(persistentClient) : persistentClient;
    }

}
