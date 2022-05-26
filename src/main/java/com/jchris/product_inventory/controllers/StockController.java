package com.jchris.product_inventory.controllers;

import java.util.List;
import java.util.Optional;

import com.jchris.product_inventory.models.Stock;
import com.jchris.product_inventory.services.StockService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

    @Autowired private StockService stockService;

    @RequestMapping("/api/stock")
    public List<Stock> getStock() {
        return stockService.getStock();
    }

    @RequestMapping("/api/stock/{productId}/{expirationDate}")
    public Optional<Stock> getStock(@PathVariable int productId, @PathVariable String expirationDate) {
        return stockService.getStockById(productId, expirationDate);
    }

    @RequestMapping(method=RequestMethod.POST, value="/api/stock")
    public void addStock(@RequestBody StockData stock) {
        stockService.addStock(stock.productId, stock.expirationDate, stock.count);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/api/stock/{productId}/{expirationDate}")
    public void deleteStock(@PathVariable int productId, @PathVariable String expirationDate) {
        stockService.deleteStock(productId, expirationDate);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/api/stock/{productId}/{expirationDate}")
    public void updateStock(@RequestBody StockData stock) {
        stockService.updateStock(stock.productId, stock.expirationDate, stock.count);
    }

    private static class StockData {
        private int productId;
        private String expirationDate;
        private int count;

        public StockData() { }
        public StockData(int productId, String expirationDate, int count) {
            this.productId = productId;
            this.expirationDate = expirationDate;
            this.count = count;
        }

        public int getProductId() {
            return productId;
        }

        public void setProductId(int productId) {
            this.productId = productId;
        }

        public String getExpirationDate() {
            return expirationDate;
        }

        public void setExpirationDate(String expirationDate) {
            this.expirationDate = expirationDate;
        }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }

        @Override public String toString() {
            return productId + " " + expirationDate + " " + count;
        }
    }
}
