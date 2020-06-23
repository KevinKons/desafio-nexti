package com.desafio.nexti.desafionexti.service;

import com.desafio.nexti.desafionexti.model.Client;
import com.desafio.nexti.desafionexti.model.Order;
import com.desafio.nexti.desafionexti.model.OrderItem;
import com.desafio.nexti.desafionexti.model.Product;
import com.desafio.nexti.desafionexti.repositories.ClientRepository;
import com.desafio.nexti.desafionexti.repositories.OrderItemRepository;
import com.desafio.nexti.desafionexti.repositories.OrderRepository;
import com.desafio.nexti.desafionexti.repositories.ProductRepository;
import com.desafio.nexti.desafionexti.validators.GeneralValidations;
import com.desafio.nexti.desafionexti.validators.OrderItemValidator;
import org.junit.Assert;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.*;

import static com.desafio.nexti.desafionexti.service.OrderService.EMPTY_ORDER_MESSAGE;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class OrderServiceTest {

    @Autowired
    private OrderService orderService;

    @MockBean
    private OrderRepository orderRepository;

    @MockBean
    private ProductRepository productRepository;

    @MockBean
    private ClientRepository clientRepository;

    @MockBean
    private GeneralValidations generalValidations;

    @MockBean
    private OrderItemRepository orderItemRepository;

    @Test
    @DisplayName("createOrder - When order doesnt have items should throw exception")
    public void test01() {
        Order order = new Order();
        order.setItems(Collections.emptyList());

        Exception exception = assertThrows(Exception.class, () -> {
            orderService.createOrder(order);
        });

        assertEquals(EMPTY_ORDER_MESSAGE, exception.getMessage());
    }

    @Test
    @DisplayName("createOrder - When order have items should save order")
    public void test02() throws Exception {
        int productInitialAmount = 5;
        Product product = new Product(1L, "sku1", "name1", "description1", 2.50, productInitialAmount);
        doReturn(Optional.of(product)).when(productRepository).findById(any());
        Client client = new Client(1L, "16578489625", "Carlos", LocalDate.of(1988, 7, 05));
        doReturn(Optional.of(client)).when(clientRepository).findById(any());

        Order order = new Order();
        order.setClient(client);
        order.setItems(Collections.singletonList(
                new OrderItem(1L, order, product, 1)
        ));

        orderService.createOrder(order);

        assertEquals(product.getPrice(), order.getPrice());
        assertEquals(productInitialAmount - 1, product.getAmount());
        verify(orderRepository, times(1)).save(order);
        verify(productRepository, times(1)).save(product);
    }

    @Test
    @DisplayName("deleteOrder - When order doesnt exist should throw NoSuchElementException")
    public void test03() {
        long orderId = 1L;
        doReturn(false).when(orderRepository).existsById(orderId);

        Assert.assertThrows(NoSuchElementException.class, () -> {
            orderService.deleteOrder(orderId);
        });

        verify(orderRepository, times(1)).existsById(orderId);
        verify(orderRepository, times(0)).deleteById(orderId);
    }

    @Test
    @DisplayName("deleteOrder - When order exists should delete")
    public void test04() throws NoSuchElementException {
        long orderId = 1L;
        doReturn(true).when(orderRepository).existsById(orderId);

        orderService.deleteOrder(orderId);

        verify(orderRepository, times(1)).existsById(orderId);
        verify(orderRepository, times(1)).deleteById(orderId);
    }

    @Test
    @DisplayName("findOrders - Should return orders list")
    public void test05() {
        List<Order> orders = Arrays.asList(
                new Order(1L, null, 2, null, null),
                new Order(2L, null, 2, null, null)
        );
        doReturn(orders).when(orderRepository).findAll();

        List<Order> result = orderService.findOrders();

        verify(orderRepository, times(1)).findAll();
        Assert.assertEquals(orders.size(), result.size());
    }

    @Test
    @DisplayName("addItems - When there is items to be added should throw Exception")
    public void test06() {
        List<OrderItem> items = Collections.emptyList();

        Exception ex = Assert.assertThrows(Exception.class, () -> {
            orderService.addItems(1L, items);
        });

        assertEquals(EMPTY_ORDER_MESSAGE, ex.getMessage());
        verify(orderItemRepository, times(0)).save(any());
        verify(orderRepository, times(0)).save(any());
    }


    @Test
    @DisplayName("addItems - When there is no items to be added should add items")
    public void test07() throws Exception {
        Product product = new Product(1L, "sku1", "name1", "description1", 2.50, 5);
        Order order = new Order(1L, null, 2, new ArrayList<>(), null);
        List<OrderItem> items = Collections.singletonList(
                new OrderItem(1L, order, product, 1)
        );
        doReturn(Optional.of(order)).when(orderRepository).findById(order.getId());
        doReturn(Optional.of(product)).when(productRepository).findById(product.getId());
        doReturn(order).when(orderRepository).save(order);

        Order result = orderService.addItems(order.getId(), items);

        assertEquals(1, result.getItems().size());
        verify(orderItemRepository, times(1)).save(items.get(0));
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    @DisplayName("deleteItems - When there is no items to be removed should throw Exception")
    public void test08() {
        List<OrderItem> items = Collections.emptyList();

        Exception ex = Assert.assertThrows(Exception.class, () -> {
            orderService.deleteItems(1L, items);
        });

        assertEquals(EMPTY_ORDER_MESSAGE, ex.getMessage());
        verify(orderItemRepository, times(0)).save(any());
        verify(orderRepository, times(0)).save(any());
    }

    @Test
    @DisplayName("deleteItems - When there items to be removed should remove items")
    public void test09() throws Exception {
        Product product = new Product(1L, "sku1", "name1", "description1", 2.50, 5);
        Order order = new Order(1L, null, 2, new ArrayList<>(), null);
        OrderItem item = new OrderItem(1L, order, product, 1);
        order.addItem(item);

        doReturn(Optional.of(order)).when(orderRepository).findById(order.getId());
        doReturn(Optional.of(item)).when(orderItemRepository).findById(item.getId());
        doReturn(order).when(orderRepository).save(order);

        Order result = orderService.deleteItems(order.getId(),
                Collections.singletonList(item));

        assertEquals(0, result.getItems().size());
        verify(orderItemRepository, times(1)).delete(item);
        verify(orderRepository, times(1)).save(order);
    }

}