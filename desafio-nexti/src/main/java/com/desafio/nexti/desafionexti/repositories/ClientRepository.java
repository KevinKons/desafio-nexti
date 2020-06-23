package com.desafio.nexti.desafionexti.repositories;

import com.desafio.nexti.desafionexti.model.Client;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends CrudRepository<Client, Long> {

    List<Client> findAll();

    Optional<Client> findByCpf(String cpf);

    boolean existsByCpf(String cpf);
}
