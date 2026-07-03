package com.ecommerce.service;

import com.ecommerce.dto.ProductResponse;
import com.ecommerce.model.*;
import com.ecommerce.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class AdminService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final OrderRepository orderRepository;

    public AdminService(ProductRepository productRepository,
                        CategoryRepository categoryRepository,
                        OrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.orderRepository = orderRepository;
    }

    public ProductResponse createProduct(Map<String, Object> body) {
        Product product = new Product();
        product.setName((String) body.get("name"));
        product.setDescription((String) body.get("description"));
        product.setPrice(BigDecimal.valueOf(Double.parseDouble(body.get("price").toString())));
        product.setStock(Integer.parseInt(body.get("stock").toString()));
        product.setImageUrl((String) body.get("imageUrl"));
        Long categoryId = Long.valueOf(body.get("categoryId").toString());
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        product.setCategory(category);
        return ProductResponse.fromProduct(productRepository.save(product));
    }

    public ProductResponse updateProduct(Long id, Map<String, Object> body) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (body.containsKey("name")) product.setName((String) body.get("name"));
        if (body.containsKey("description")) product.setDescription((String) body.get("description"));
        if (body.containsKey("price")) product.setPrice(BigDecimal.valueOf(Double.parseDouble(body.get("price").toString())));
        if (body.containsKey("stock")) product.setStock(Integer.parseInt(body.get("stock").toString()));
        if (body.containsKey("imageUrl")) product.setImageUrl((String) body.get("imageUrl"));
        if (body.containsKey("categoryId")) {
            Long categoryId = Long.valueOf(body.get("categoryId").toString());
            product.setCategory(categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found")));
        }
        return ProductResponse.fromProduct(productRepository.save(product));
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }

    public Category createCategory(String name) {
        if (categoryRepository.existsByName(name)) {
            throw new RuntimeException("Category already exists");
        }
        return categoryRepository.save(new Category(name));
    }

    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        if (!productRepository.findByCategoryId(id).isEmpty()) {
            throw new RuntimeException("Cannot delete category with associated products");
        }
        categoryRepository.delete(category);
    }

    public List<com.ecommerce.dto.OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(com.ecommerce.dto.OrderResponse::fromOrder)
                .toList();
    }

    public com.ecommerce.dto.OrderResponse updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(status);
        return com.ecommerce.dto.OrderResponse.fromOrder(orderRepository.save(order));
    }
}
