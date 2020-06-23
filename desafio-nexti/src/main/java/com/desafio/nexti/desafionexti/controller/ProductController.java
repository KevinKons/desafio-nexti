package com.desafio.nexti.desafionexti.controller;

import com.desafio.nexti.desafionexti.model.Product;
import com.desafio.nexti.desafionexti.service.ProductService;
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
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> createProduct(@RequestBody Product product) {
        try {
            Product registeredClient = productService.createProduct(product);
            return new ResponseEntity<>(registeredClient, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/{id}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> deleteProduct(@PathVariable("id") long id) {
        try {
            productService.deleteProduct(id);
        } catch(Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findAll() {
        List<Product> products = productService.findProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping(value = "/{sku}", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> findProduct(@PathVariable String sku) {
        Product product;
        try {
            product = productService.findProduct(sku);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch(Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<?> editProduct(@RequestBody Product product) {
        Product modifiedProduct;
        try {
            modifiedProduct = productService.editProduct(product);
            return new ResponseEntity<>(modifiedProduct, HttpStatus.OK);
        } catch(Exception ex) {
            return new ResponseEntity<>(new CustomErrorType(ex.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }
}
