package com.jchris.product_inventory.controllers;

import java.util.List;
import java.util.Optional;

import com.jchris.product_inventory.models.Product;
import com.jchris.product_inventory.services.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @Autowired private ProductService productService;

    @RequestMapping("/api/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @RequestMapping("/api/product/{productId}")
    public Optional<Product> getProduct(@PathVariable int productId) {
        return productService.getProductById(productId);
    }
}
