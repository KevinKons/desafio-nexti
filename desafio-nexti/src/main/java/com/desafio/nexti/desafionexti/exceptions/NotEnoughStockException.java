package com.desafio.nexti.desafionexti.exceptions;

public class NotEnoughStockException extends RuntimeException {
    public NotEnoughStockException(String productName, int amountAvailable) {
        super("There is not enough stock for the product " + productName + ". The current stock of this" +
                "product is " + amountAvailable);
    }
}
