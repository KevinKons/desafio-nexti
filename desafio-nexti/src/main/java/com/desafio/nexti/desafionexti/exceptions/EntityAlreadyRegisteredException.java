package com.desafio.nexti.desafionexti.exceptions;

public class EntityAlreadyRegisteredException extends RuntimeException {
    public EntityAlreadyRegisteredException(String message) {
        super(message);
    }
}