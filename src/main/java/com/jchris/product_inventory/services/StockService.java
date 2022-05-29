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
    @Autowired private LRUCache<StockId, Stock> stockCache;

    public List<Stock> getStock() {
        List<Stock> stock = new ArrayList<>();
        stockRepository.findAll().forEach(stock::add);
        return stock;
    }

    public Stock getStockById(int productId, String expirationDate) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isEmpty()) {
            StockId id = new StockId(product.get(), expirationDate);
            Stock s = stockCache.get(id); // check cache first before db
            if (s != null)
                return s;
            else { // if not in cache, check db
                Optional<Stock> Os = stockRepository.findById(id);
                if (!Os.isEmpty()) {
                    // add item to cache
                    stockCache.add(id, Os.get());
                    return Os.get();
                }
                else return null;
            }
        }
        else return null;
    }

    public void addStock(int productId, String expirationDate, int count) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isEmpty()) {
            StockId newStockId = new StockId(product.get(), expirationDate);
            Stock newStock = new Stock(newStockId, count);

            stockCache.add(newStockId, newStock);
            stockRepository.save(newStock);
        }
    }

    public void deleteStock(int productId, String expirationDate) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isEmpty()) {
            StockId id = new StockId(product.get(), expirationDate);
            stockRepository.deleteById(id);
            stockCache.evict(id);
        }
    }

    public void updateStock(int productId, String expirationDate, int count) {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isEmpty()) {
            StockId newStockId = new StockId(product.get(), expirationDate);
            Stock newStock = new Stock(newStockId, count);

            stockCache.add(newStockId, newStock);
            stockRepository.save(newStock);
        }
    }
}
