package it.korea.app_boot.entity;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Product {
    private Integer id;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private Timestamp createdAt;

    // getter, setter
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Timestamp getCreatedAt() { return createdAt; }
    public void setCreatedAt(Timestamp createdAt) { this.createdAt = createdAt; }
}
