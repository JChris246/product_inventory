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
    @Autowired private LRUCache<Integer, Product> productCache;

    public List<Product> getProducts() {
        List<Product> products = new ArrayList<>();
        productRepository.findAll().forEach(products::add);
        return products;
    }

    public Product getProductById(int productId) {
        Product product = productCache.get(productId);
        if (product == null) {
            Optional<Product> p = productRepository.findById(productId);
            if (!p.isEmpty()) {
                product = p.get();
                productCache.add(product.getId(), product);
                return product;
            } else return null;
        }

        return product;
    }

    public void addProduct(Product product) {
        productCache.add(product.getId(), product);
        productRepository.save(product);
    }

    public void deleteProduct(int productId) {
        productCache.evict(productId);
        productRepository.deleteById(productId);
    }

    public void updateProduct(Product product) {
        productCache.add(product.getId(), product);
        productRepository.save(product);
    }
}
