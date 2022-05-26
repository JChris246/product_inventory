package com.jchris.product_inventory.models;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
public class Stock implements Serializable {
    private static final long SerialVersionUID = 1l;

    /**The product these stock items refer to */
    @EmbeddedId
    private StockId stockId;

    private int count;

    public Stock() {

    }

    public Stock(StockId stockId) {
        this(stockId, 0);
    }

    public Stock(StockId StockId, int count) {
        this.stockId = StockId;
        this.count = count;
    }

    public StockId getStockId() {
        return this.stockId;
    }

    public void setStockId(StockId stockId) {
        this.stockId = stockId;
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
        return this.stockId == stockObj.getStockId();
    }

    @Override public int hashCode() {
        return Objects.hash(this.stockId);
    }

    @Override public String toString() {
        return this.stockId.toString() + " " + this.getCount();
    }
}
