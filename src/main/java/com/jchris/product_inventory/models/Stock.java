package com.jchris.product_inventory.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

@Entity
@IdClass(Stock.class)
public class Stock implements Serializable {
    private static final long SerialVersionUID = 1l;

    /**The product these stock items refer to */
    @ManyToOne @Id
    private Product product;
    /**The expiration date of these stock items */
    @Id private String expirationDate;
    /**The amount of items in stock of this product, with this expiration date */
    private int count;

    public Stock() {
        this(new Product(), "", 0);
    }

    public Stock(Product product, String date) {
        this(product, date, 0);
    }

    public Stock(Product product, String expirationDate, int count) {
        this.product = product;
        this.expirationDate = expirationDate;
        this.count = count;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;

        Stock stockObj = (Stock) o;
        return this.product.getId() == stockObj.getProduct().getId() && this.expirationDate.equals(stockObj.expirationDate);
    }

    @Override public int hashCode() {
        return Objects.hash(this.product, this.expirationDate);
    }
}
