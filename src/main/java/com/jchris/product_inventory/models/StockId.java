package com.jchris.product_inventory.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;

@Embeddable
public class StockId implements Serializable {
    private static final long SerialVersionUID = 1l;

    /**The product these stock items refer to */
    // @Column(name = "product_id")
    @ManyToOne
    private Product product;

    /**The expiration date of these stock items */
    // @Column(name = "expiration_date")
    private String expirationDate;

    public StockId() {

    }

    public StockId(Product product, String expirationDate) {
        this.product = product;
        this.expirationDate = expirationDate;
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

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || this.getClass() != o.getClass()) return false;

        StockId stockId = (StockId) o;
        return this.product.getId() == stockId.product.getId() && this.expirationDate.equals(stockId.expirationDate);
    }

    @Override public int hashCode() {
        return Objects.hash(this.product, this.expirationDate);
    }

    @Override public String toString() {
        return this.product.toString() + " " + this.getExpirationDate();
    }
}