package com.ecommerce.controller;

import com.ecommerce.dto.ProductResponse;
import com.ecommerce.service.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getWishlist(Authentication auth) {
        return ResponseEntity.ok(wishlistService.getWishlist(auth.getName()));
    }

    @PostMapping
    public ResponseEntity<List<ProductResponse>> addItem(Authentication auth, @RequestBody Map<String, Object> body) {
        Long productId = Long.valueOf(body.get("productId").toString());
        return ResponseEntity.ok(wishlistService.addItem(auth.getName(), productId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<List<ProductResponse>> removeItem(Authentication auth, @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.removeItem(auth.getName(), productId));
    }

    @PostMapping("/{productId}/move-to-cart")
    public ResponseEntity<List<ProductResponse>> moveToCart(Authentication auth, @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.moveToCart(auth.getName(), productId));
    }
}
