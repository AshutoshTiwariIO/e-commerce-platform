package com.ecommerce.service;

import com.ecommerce.dto.ProductResponse;
import com.ecommerce.model.*;
import com.ecommerce.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartService cartService;

    public WishlistService(WishlistRepository wishlistRepository,
                           ProductRepository productRepository,
                           UserRepository userRepository,
                           CartService cartService) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartService = cartService;
    }

    private Wishlist getOrCreateWishlist(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return wishlistRepository.findByUserId(user.getId())
                .orElseGet(() -> wishlistRepository.save(new Wishlist(user)));
    }

    public List<ProductResponse> getWishlist(String email) {
        Wishlist wishlist = getOrCreateWishlist(email);
        return wishlist.getProducts().stream()
                .map(ProductResponse::fromProduct)
                .toList();
    }

    public List<ProductResponse> addItem(String email, Long productId) {
        Wishlist wishlist = getOrCreateWishlist(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (wishlist.getProducts().stream().anyMatch(p -> p.getId().equals(productId))) {
            throw new RuntimeException("Product already in wishlist");
        }
        wishlist.getProducts().add(product);
        wishlistRepository.save(wishlist);
        return getWishlist(email);
    }

    public List<ProductResponse> removeItem(String email, Long productId) {
        Wishlist wishlist = getOrCreateWishlist(email);
        wishlist.getProducts().removeIf(p -> p.getId().equals(productId));
        wishlistRepository.save(wishlist);
        return getWishlist(email);
    }

    public List<ProductResponse> moveToCart(String email, Long productId) {
        removeItem(email, productId);
        cartService.addItem(email, productId, 1);
        return getWishlist(email);
    }
}
