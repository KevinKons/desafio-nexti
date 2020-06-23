package com.desafio.nexti.desafionexti.controller;

import com.desafio.nexti.desafionexti.exceptions.EntityAlreadyRegisteredException;
import com.desafio.nexti.desafionexti.model.Client;
import com.desafio.nexti.desafionexti.service.ClientService;
import com.desafio.nexti.desafionexti.utils.CustomErrorType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@Controller
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/client")
public class ClientController {

    @Autowired
    ClientService clientService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createClient(@RequestBody Client client) {
        try {
            Client registeredClient = clientService.createClient(client);
            return new ResponseEntity<>(registeredClient, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> deleteClient(@PathVariable("id") long id) {
        try {
            clientService.deleteClient(id);
        } catch(NoSuchElementException ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findAll() {
        List<Client> clients = clientService.findClients();
        return new ResponseEntity<>(clients, HttpStatus.OK);
    }

    @GetMapping(value = "/{cpf}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findClient(@PathVariable String cpf) {
        Client client;
        try {
            client = clientService.findClient(cpf);
        } catch(NoSuchElementException ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }

        return new ResponseEntity<>(client, HttpStatus.OK);
    }

    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editClient(@RequestBody Client client) {
        Client modifiedClient;
        try {
            modifiedClient = clientService.editClient(client);
        } catch (NoSuchElementException ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }
        return new ResponseEntity<>(modifiedClient, HttpStatus.OK);
    }
}
