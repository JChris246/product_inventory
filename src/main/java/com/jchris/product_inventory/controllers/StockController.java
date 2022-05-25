package com.jchris.product_inventory.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

    @RequestMapping("/api/stock")
    public List<StockController> getStock() {
        return null;
    }
}
