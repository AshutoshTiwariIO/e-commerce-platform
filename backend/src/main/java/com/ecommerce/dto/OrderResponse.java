package com.ecommerce.dto;

import com.ecommerce.model.Order;
import com.ecommerce.model.OrderItem;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponse {
    private Long id;
    private String status;
    private BigDecimal total;
    private String shippingAddress;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;

    public static OrderResponse fromOrder(Order order) {
        OrderResponse r = new OrderResponse();
        r.id = order.getId();
        r.status = order.getStatus();
        r.total = order.getTotal();
        r.shippingAddress = order.getShippingAddress();
        r.createdAt = order.getCreatedAt();
        r.items = order.getItems().stream().map(OrderItemResponse::fromOrderItem).toList();
        return r;
    }

    public Long getId() { return id; }
    public String getStatus() { return status; }
    public BigDecimal getTotal() { return total; }
    public String getShippingAddress() { return shippingAddress; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public List<OrderItemResponse> getItems() { return items; }

    public static class OrderItemResponse {
        private Long id;
        private Long productId;
        private String productName;
        private int quantity;
        private BigDecimal price;

        public static OrderItemResponse fromOrderItem(OrderItem item) {
            OrderItemResponse r = new OrderItemResponse();
            r.id = item.getId();
            r.productId = item.getProduct().getId();
            r.productName = item.getProduct().getName();
            r.quantity = item.getQuantity();
            r.price = item.getPrice();
            return r;
        }

        public Long getId() { return id; }
        public Long getProductId() { return productId; }
        public String getProductName() { return productName; }
        public int getQuantity() { return quantity; }
        public BigDecimal getPrice() { return price; }
    }
}
