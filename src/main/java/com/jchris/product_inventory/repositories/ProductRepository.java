package com.jchris.product_inventory.repositories;

import com.jchris.product_inventory.models.Product;

import org.springframework.data.repository.CrudRepository;

public interface ProductRepository extends CrudRepository<Product, Integer> {

}
