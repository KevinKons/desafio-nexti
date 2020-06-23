package com.desafio.nexti.desafionexti.validators;

import com.desafio.nexti.desafionexti.exceptions.NotEnoughStockException;
import com.desafio.nexti.desafionexti.model.OrderItem;
import com.desafio.nexti.desafionexti.model.Product;
import com.desafio.nexti.desafionexti.repositories.OrderRepository;
import com.desafio.nexti.desafionexti.repositories.ProductRepository;
import com.desafio.nexti.desafionexti.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderItemValidator {

    @Autowired
    private ProductRepository productRepository;

    public void validateThereIsEnoughStock(List<OrderItem> orderItems) throws Exception {
        for(OrderItem orderItem: orderItems) {
            if(orderItem.getAmount() > orderItem.getProduct().getAmount()) {
                throw new NotEnoughStockException(orderItem.getProduct().getName(), orderItem.getProduct().getAmount());
            }
        }
    }
}
