package com.desafio.nexti.desafionexti.controller;

import com.desafio.nexti.desafionexti.model.Order;
import com.desafio.nexti.desafionexti.model.OrderItem;
import com.desafio.nexti.desafionexti.service.OrderService;
import com.desafio.nexti.desafionexti.utils.CustomErrorType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@Controller
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            orderService.createOrder(order);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable long id) {
        try {
            orderService.deleteOrder(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }
    }

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findAll() {
        List<Order> orders = orderService.findOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping(value = "/purchaseDate", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editPurchaseDate(@RequestBody Order order) {
        try {
            Order modifiedOrder = orderService.editPurchaseDate(order);
            return new ResponseEntity<>(modifiedOrder, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }
    }

    @PutMapping(value = "/add/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> addItems(@PathVariable("id") long orderId, @RequestBody List<OrderItem> items) {
        try {
            Order order = orderService.addItems(orderId, items);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }
    }

    @PutMapping(value = "/rm/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> deleteItems(@PathVariable("id") long id, @RequestBody List<OrderItem> items) {
        try {
            Order order = orderService.deleteItems(id, items);
            return new ResponseEntity<>(order, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.OK);
        }
    }
}
