package com.desafio.nexti.desafionexti.repositories;

import com.desafio.nexti.desafionexti.model.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends CrudRepository<Product, Long> {
    List<Product> findAll();

    Optional<Product> findBySku(String sku);

    boolean existsBySku(String sku);

}
