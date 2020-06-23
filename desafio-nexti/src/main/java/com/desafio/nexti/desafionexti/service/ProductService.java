package com.desafio.nexti.desafionexti.service;

import com.desafio.nexti.desafionexti.exceptions.EntityAlreadyRegisteredException;
import com.desafio.nexti.desafionexti.model.Client;
import com.desafio.nexti.desafionexti.model.Product;
import com.desafio.nexti.desafionexti.repositories.ProductRepository;
import com.desafio.nexti.desafionexti.validators.GeneralValidations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductService {

    public static final String NOT_FOUND_MESSAGE = "Product not found";
    public static final String SKU_ALREADY_REGISTERED_MESSAGE = "SKU already registered";

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private GeneralValidations generalValidations;

    public Product createProduct(Product product) throws Exception {
        generalValidations.validateIdZeroOrNull(product.getId());
        if(productRepository.existsBySku(product.getSku()))
            throw new EntityAlreadyRegisteredException(SKU_ALREADY_REGISTERED_MESSAGE);
        return productRepository.save(product);
    }

    public void deleteProduct(long id) {
        if(productRepository.existsById(id))
            productRepository.deleteById(id);
        else
            throw new NoSuchElementException(NOT_FOUND_MESSAGE);
    }

    public List<Product> findProducts() {
        return productRepository.findAll();
    }

    public Product findProduct(String sku) {
        Optional<Product> optProduct = productRepository.findBySku(sku);
        if(!optProduct.isPresent())
            throw new NoSuchElementException(NOT_FOUND_MESSAGE);
        return optProduct.get();
    }

    public Product editProduct(Product product) {
        Product persistentProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new NoSuchElementException(NOT_FOUND_MESSAGE));

        boolean wasModified = false;
        if(!product.getSku().equals(persistentProduct.getSku())) {
            persistentProduct.setSku(product.getSku());
            wasModified = true;
        }
        if(!product.getName().equals(persistentProduct.getName())) {
            persistentProduct.setName(product.getName());
            wasModified = true;
        }
        if(!product.getDescription().equals(persistentProduct.getDescription())) {
            persistentProduct.setDescription(product.getDescription());
            wasModified = true;
        }
        if(product.getPrice() != persistentProduct.getPrice()) {
            persistentProduct.setPrice(product.getPrice());
            wasModified = true;
        }
        if(product.getAmount() != persistentProduct.getAmount()) {
            persistentProduct.setAmount(product.getAmount());
            wasModified = true;
        }

        return wasModified ? productRepository.save(persistentProduct) : persistentProduct;
    }

}
