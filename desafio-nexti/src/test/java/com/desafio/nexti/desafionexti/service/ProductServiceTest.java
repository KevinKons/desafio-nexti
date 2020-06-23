package com.desafio.nexti.desafionexti.service;

import com.desafio.nexti.desafionexti.exceptions.EntityAlreadyRegisteredException;
import com.desafio.nexti.desafionexti.model.Client;
import com.desafio.nexti.desafionexti.model.Product;
import com.desafio.nexti.desafionexti.repositories.ProductRepository;
import com.desafio.nexti.desafionexti.validators.GeneralValidations;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ProductServiceTest {

    @Autowired
    private ProductService productService;

    @MockBean
    private ProductRepository productRepository;

    @MockBean
    private GeneralValidations generalValidations;

    @Test
    @DisplayName("createProduct - When SKU is not registered should save product")
    public void test01() throws Exception {
        Product product = new Product(1L, "sku", "name", "description", 2.50, 10);

        productService.createProduct(product);

        verify(productRepository, times(1)).existsBySku(product.getSku());
        verify(productRepository, times(1)).save(product);
    }

    @Test
    @DisplayName("createProduct - When SKU is registered should throw exception")
    public void test02() throws EntityAlreadyRegisteredException {
        Product product = new Product(1L, "sku", "name", "description", 2.50, 10);
        doReturn(true).when(productRepository).existsBySku(product.getSku());

        assertThrows(EntityAlreadyRegisteredException.class, () -> {
            productService.createProduct(product);
        });

        verify(productRepository, times(0)).save(product);
    }

    @Test
    @DisplayName("deleteProduct - When product exists should delete")
    public void test03() throws NoSuchElementException {
        long productId = 1L;
        doReturn(true).when(productRepository).existsById(productId);

        productService.deleteProduct(productId);

        verify(productRepository, times(1)).existsById(productId);
        verify(productRepository, times(1)).deleteById(productId);
    }

    @Test
    @DisplayName("deleteProduct - When product doesnt exists should throw NoSuchElementException")
    public void test04() throws NoSuchElementException {
        long productId = 1L;
        doReturn(false).when(productRepository).existsById(productId);

        assertThrows(NoSuchElementException.class, () -> {
            productService.deleteProduct(productId);
        });

        verify(productRepository, times(1)).existsById(productId);
        verify(productRepository, times(0)).deleteById(productId);
    }

    @Test
    @DisplayName("findProducts - Should return product list")
    public void test05() {
        List<Product> products = Arrays.asList(
                new Product(1L, "sku", "name", "description", 2.50, 10),
                new Product(2L, "sku2", "name2", "description2", 2.50, 10)
        );
        doReturn(products).when(productRepository).findAll();

        List<Product> result = productService.findProducts();

        verify(productRepository, times(1)).findAll();
        assertEquals(products.size(), result.size());
    }

    @Test
    @DisplayName("findProduct - When product doesnt exist should throw no SuchElementException")
    public void test06() {
        doReturn(Optional.empty()).when(productRepository).findBySku(any());
        String sku = "sku";

        assertThrows(NoSuchElementException.class, () -> {
            productService.findProduct(sku);
        });

        verify(productRepository, times(1)).findBySku(sku);
    }

    @Test
    @DisplayName("findProduct - When product exists should find product")
    public void test07() {
        Product product = new Product(1L, "sku", "name", "description", 2.50, 10);
        doReturn(Optional.of(product)).when(productRepository).findBySku(product.getSku());

        Product result = productService.findProduct(product.getSku());

        verify(productRepository, times(1)).findBySku(product.getSku());
        assertEquals(product.getId(), result.getId());
    }

    @Test
    @DisplayName("editProduct - When product doesnt exist should throw NoSuchElementException")
    public void test08() {
        long productId = 1L;
        Product product = new Product(productId, "sku", "name", "description", 2.50, 10);
        doReturn(Optional.empty()).when(productRepository).findById(productId);

        assertThrows(NoSuchElementException.class, () -> {
            productService.editProduct(product);
        });

        verify(productRepository, times(1)).findById(productId);
        verify(productRepository, times(0)).save(product);
    }

    @Test
    @DisplayName("editProduct - When product wasnt modified shouldnt save product")
    public void test09() {
        Product product = new Product(1L, "sku", "name", "description", 2.50, 10);
        doReturn(Optional.of(product)).when(productRepository).findById(product.getId());

        productService.editProduct(product);

        verify(productRepository, times(1)).findById(product.getId());
        verify(productRepository, times(0)).save(product);
    }

    @Test
    @DisplayName("editProduct - When product is modified should save product with new information")
    public void test10() {
        Product product = new Product(1L, "sku", "name", "description", 2.50, 10);
        Product alteredProduct = new Product(1L, "sku2", "name2", "description2", 2.52, 12);
        doReturn(Optional.of(product)).when(productRepository).findById(product.getId());

        productService.editProduct(alteredProduct);

        verify(productRepository, times(1)).findById(product.getId());
        verify(productRepository, times(1)).save(product);
    }
}