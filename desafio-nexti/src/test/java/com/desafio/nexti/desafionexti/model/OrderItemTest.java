package com.desafio.nexti.desafionexti.model;

import org.junit.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class OrderItemTest {

    @Test
    @DisplayName("getPrice - Should return price of an OrderItem")
    public void test01() {
        Product product = new Product(1L, "sku", "name", "description", 2.50, 10);
        OrderItem orderItem = new OrderItem();
        orderItem.setProduct(product);
        orderItem.setAmount(2);

        double expected = product.getPrice() * orderItem.getAmount();
        double result = orderItem.getPrice();

        assertEquals(expected, result);
    }

}