package com.jchris.product_inventory.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.jchris.product_inventory.models.Product;
import com.jchris.product_inventory.repositories.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired private ProductRepository productRepository;

    public List<Product> getProducts() {
        List<Product> products = new ArrayList<>();
        productRepository.findAll().forEach(products::add);
        return products;
    }

    public Optional<Product> getProductById(int productId) {
        return productRepository.findById(productId);
    }
}
