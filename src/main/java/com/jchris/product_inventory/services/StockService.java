package com.jchris.product_inventory.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.jchris.product_inventory.models.Product;
import com.jchris.product_inventory.models.Stock;
import com.jchris.product_inventory.models.StockId;
import com.jchris.product_inventory.repositories.ProductRepository;
import com.jchris.product_inventory.repositories.StockRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockService {
    @Autowired private StockRepository stockRepository;
    @Autowired private ProductRepository productRepository;

    public List<Stock> getStock() {
        List<Stock> stock = new ArrayList<>();
        stockRepository.findAll().forEach(stock::add);
        return stock;
    }

    public Optional<Stock> getStockById(int productId, String expirationDate) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isEmpty())
            return stockRepository.findById(new StockId(product.get(), expirationDate));
        else return null;
    }

    public void addStock(int productId, String expirationDate, int count) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isEmpty())
            stockRepository.save(new Stock(new StockId(product.get(), expirationDate), count));
    }

    public void deleteStock(int productId, String expirationDate) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isEmpty())
            stockRepository.deleteById(new StockId(product.get(), expirationDate));
    }

    public void updateStock(int productId, String expirationDate, int count) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isEmpty())
            stockRepository.save(new Stock(new StockId(product.get(), expirationDate), count));
    }
}
