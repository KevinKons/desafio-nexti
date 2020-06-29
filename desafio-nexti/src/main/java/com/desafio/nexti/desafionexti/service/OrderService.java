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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class OrderService {

    public static final String EMPTY_ORDER_MESSAGE = "Order must have at least one item";
    public static final String NOT_FOUND_MESSAGE = "Order not found";


    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private OrderItemValidator orderItemValidator;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private GeneralValidations generalValidations;

    public Order createOrder(Order order) throws Exception {
        generalValidations.validateIdZeroOrNull(order.getId());
        if (order.getItems().size() <= 0) throw new Exception(EMPTY_ORDER_MESSAGE);

        defineProductInOrderItems(order.getItems());
        orderItemValidator.validateThereIsEnoughStock(order.getItems());

        defineClientInOrder(order);
        order.getItems().forEach(item -> {
            item.setOrder(order);
        });

        order.setPurchaseDate(LocalDate.now());
        order.definePrice();
        subtractProductAmount(order.getItems());
        return orderRepository.save(order);
    }

    private void defineClientInOrder(Order order) throws Exception {
        long clientId = order.getClient().getId();
        Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new Exception("Client with id " + clientId + " doesnt exists"));
        order.setClient(client);

    }

    private void defineProductInOrderItems(List<OrderItem> items) throws Exception {
        for (OrderItem item : items) {
            long productId = item.getProduct().getId();
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new Exception("Product with id" + productId + "doesnt exists"));
            item.setProduct(product);
        }
    }

    private void subtractProductAmount(List<OrderItem> items) {
        for (OrderItem orderItem : items) {
            Product product = orderItem.getProduct();
            product.setAmount(product.getAmount() - orderItem.getAmount());
            productRepository.save(product);
        }
    }

    public void deleteOrder(long id) {
        if (orderRepository.existsById(id))
            orderRepository.deleteById(id);
        else
            throw new NoSuchElementException(NOT_FOUND_MESSAGE);
    }

    public List<Order> findOrders() {
        return orderRepository.findAll();
    }

    public Order editPurchaseDate(Order order) {
        Order persistedOrder = orderRepository.findById(order.getId())
                .orElseThrow(() -> new NoSuchElementException(NOT_FOUND_MESSAGE));

        boolean modified = false;
        if (!order.getPurchaseDate().isEqual(persistedOrder.getPurchaseDate())) {
            modified = true;
            persistedOrder.setPurchaseDate(order.getPurchaseDate());
        }

        return modified ? orderRepository.save(order) : persistedOrder;
    }

    public Order addItems(long orderId, List<OrderItem> items) throws Exception {
        if (items.size() <= 0) throw new Exception(EMPTY_ORDER_MESSAGE);
        Order persistedOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException(NOT_FOUND_MESSAGE));
        defineProductInOrderItems(items);
        orderItemValidator.validateThereIsEnoughStock(items);
        items.forEach(item -> {
            item.setOrder(persistedOrder);
            persistedOrder.addItem(item);
            orderItemRepository.save(item);
        });
        persistedOrder.definePrice();
        return orderRepository.save(persistedOrder);
    }

    public Order deleteItems(long orderId, List<OrderItem> items) throws Exception {
        if (items.size() <= 0) throw new Exception(EMPTY_ORDER_MESSAGE);
        Order persistedOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new NoSuchElementException(NOT_FOUND_MESSAGE));
        for (OrderItem item : items) {
            OrderItem persistedOrderItem = orderItemRepository.findById(item.getId())
                    .orElseThrow(() -> new Exception("Item " + item.getProduct().getName() + " doesnt exist"));
            persistedOrder.removeItem(persistedOrderItem);
            orderItemRepository.delete(persistedOrderItem);
        }
        persistedOrder.definePrice();
        return orderRepository.save(persistedOrder);
    }

}
