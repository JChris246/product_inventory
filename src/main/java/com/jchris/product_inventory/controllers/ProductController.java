package com.jchris.product_inventory.controllers;

import java.util.List;

import com.jchris.product_inventory.models.Product;
import com.jchris.product_inventory.services.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @Autowired private ProductService productService;

    @RequestMapping("/api/products")
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @RequestMapping("/api/product/{productId}")
    public Product getProduct(@PathVariable int productId) {
        return productService.getProductById(productId);
    }

    @RequestMapping(method=RequestMethod.POST, value="/api/product")
    public void addProduct(@RequestBody Product product) {
        productService.addProduct(product);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/api/product/{productId}")
    public void deleteProduct(@PathVariable int productId) {
        productService.deleteProduct(productId);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/api/product/{productId}")
    public void updateProduct(@RequestBody Product product) {
        productService.updateProduct(product);
    }
}
