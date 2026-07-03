package com.ecommerce.dto;

import com.ecommerce.model.CartItem;
import java.math.BigDecimal;

public class CartItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private BigDecimal unitPrice;
    private int quantity;
    private BigDecimal subtotal;

    public static CartItemResponse fromCartItem(CartItem item) {
        CartItemResponse r = new CartItemResponse();
        r.id = item.getId();
        r.productId = item.getProduct().getId();
        r.productName = item.getProduct().getName();
        r.unitPrice = item.getProduct().getPrice();
        r.quantity = item.getQuantity();
        r.subtotal = item.getSubtotal();
        return r;
    }

    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public String getProductName() { return productName; }
    public BigDecimal getUnitPrice() { return unitPrice; }
    public int getQuantity() { return quantity; }
    public BigDecimal getSubtotal() { return subtotal; }
}
