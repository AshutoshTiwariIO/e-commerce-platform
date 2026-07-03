package com.ecommerce.dto;

import com.ecommerce.model.Product;
import java.math.BigDecimal;

public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private int stock;
    private String imageUrl;
    private Long categoryId;
    private String categoryName;

    public static ProductResponse fromProduct(Product p) {
        ProductResponse r = new ProductResponse();
        r.id = p.getId();
        r.name = p.getName();
        r.description = p.getDescription();
        r.price = p.getPrice();
        r.stock = p.getStock();
        r.imageUrl = p.getImageUrl();
        if (p.getCategory() != null) {
            r.categoryId = p.getCategory().getId();
            r.categoryName = p.getCategory().getName();
        }
        return r;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public int getStock() { return stock; }
    public String getImageUrl() { return imageUrl; }
    public Long getCategoryId() { return categoryId; }
    public String getCategoryName() { return categoryName; }
}
