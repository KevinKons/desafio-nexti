package com.desafio.nexti.desafionexti.repositories;

import com.desafio.nexti.desafionexti.model.OrderItem;
import org.springframework.data.repository.CrudRepository;

public interface OrderItemRepository extends CrudRepository<OrderItem, Long>  {
}
