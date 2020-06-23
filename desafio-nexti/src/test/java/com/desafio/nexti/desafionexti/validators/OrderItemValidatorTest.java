package com.desafio.nexti.desafionexti.validators;

import com.desafio.nexti.desafionexti.exceptions.NotEnoughStockException;
import com.desafio.nexti.desafionexti.model.Order;
import com.desafio.nexti.desafionexti.model.OrderItem;
import com.desafio.nexti.desafionexti.model.Product;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@RunWith(SpringRunner.class)
public class OrderItemValidatorTest {

    @Autowired
    private OrderItemValidator orderItemValidator;

    private Order order = new Order();
    private Product product1 = new Product(1L, "sku1", "name1", "description1", 2.50, 5);
    private Product product2 = new Product(2L, "sku2", "name2", "description2", 3, 2);

    @Test
    @DisplayName("validateThereIsEnoughStock - When none of the items exceed the amount in the stock " +
            "shouldnt throw exception")
    public void test01() throws Exception {
        List<OrderItem> orderItems = Arrays.asList(
                new OrderItem(1L, order, product1, 1),
                new OrderItem(2L, order, product2, 1)
        );

        orderItemValidator.validateThereIsEnoughStock(orderItems);
    }

    @Test
    @DisplayName("validateThereIsEnoughStock - When any of the items exceed the amount in the stock " +
            "should throw exception")
    public void test02() {
        List<OrderItem> orderItems = Arrays.asList(
                new OrderItem(1L, order, product1, 1),
                new OrderItem(2L, order, product2, 3)
        );

        assertThrows(NotEnoughStockException.class, () -> {
            orderItemValidator.validateThereIsEnoughStock(orderItems);
        });
    }

}