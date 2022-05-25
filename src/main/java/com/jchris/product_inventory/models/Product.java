package com.jchris.product_inventory.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Product {

    /**id of the product */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id private int id;
    /**image url of the product */
    private String image;
    /**name of the product */
    private String name;

    public Product() {

    }

    public Product(int id, String image, String name) {
        this.id = id;
        this.image = image;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
