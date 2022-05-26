package com.jchris.product_inventory.repositories;

import com.jchris.product_inventory.models.StockId;
import com.jchris.product_inventory.models.Stock;

import org.springframework.data.repository.CrudRepository;

public interface StockRepository extends CrudRepository<Stock, StockId> {

}
