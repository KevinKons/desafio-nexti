package com.desafio.nexti.desafionexti.repositories;

import com.desafio.nexti.desafionexti.model.Order;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long>  {
    List<Order> findAll();
}
