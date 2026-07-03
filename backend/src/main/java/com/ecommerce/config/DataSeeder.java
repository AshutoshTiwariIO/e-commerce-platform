package com.ecommerce.config;

import com.ecommerce.model.Category;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository,
                      CategoryRepository categoryRepository,
                      ProductRepository productRepository,
                      PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) return;

        User admin = new User("admin@ecommerce.com", passwordEncoder.encode("admin123"), "Admin", "ADMIN");
        userRepository.save(admin);
        User user = new User("user@ecommerce.com", passwordEncoder.encode("user123"), "Test User", "USER");
        userRepository.save(user);

        Category laptops = categoryRepository.save(new Category("Laptops"));
        Category phones = categoryRepository.save(new Category("Phones"));
        Category accessories = categoryRepository.save(new Category("Accessories"));
        Category headphones = categoryRepository.save(new Category("Headphones"));
        Category tablets = categoryRepository.save(new Category("Tablets"));

        productRepository.save(createProduct("MacBook Pro 14", "Apple M3 Pro chip, 16GB RAM, 512GB SSD", 1999.99, 15, laptops));
        productRepository.save(createProduct("MacBook Air M2", "Apple M2 chip, 8GB RAM, 256GB SSD", 1099.99, 20, laptops));
        productRepository.save(createProduct("Dell XPS 15", "Intel i7, 16GB RAM, 512GB SSD, OLED display", 1799.99, 10, laptops));
        productRepository.save(createProduct("ThinkPad X1 Carbon", "Intel i7, 16GB RAM, 512GB SSD", 1649.99, 8, laptops));
        productRepository.save(createProduct("iPhone 15 Pro", "128GB, Titanium, A17 Pro chip", 999.99, 25, phones));
        productRepository.save(createProduct("iPhone 15", "128GB, A16 Bionic chip", 799.99, 30, phones));
        productRepository.save(createProduct("Samsung Galaxy S24", "256GB, Snapdragon 8 Gen 3", 899.99, 20, phones));
        productRepository.save(createProduct("Google Pixel 8", "128GB, Tensor G3 chip", 699.99, 15, phones));
        productRepository.save(createProduct("Wireless Mouse MX Master 3S", "Ergonomic, silent clicks, 8000 DPI", 99.99, 50, accessories));
        productRepository.save(createProduct("Mechanical Keyboard K8", "RGB, hot-swappable, wireless", 149.99, 35, accessories));
        productRepository.save(createProduct("USB-C Hub 7-in-1", "HDMI, USB-A, SD card, PD charging", 49.99, 60, accessories));
        productRepository.save(createProduct("AirPods Pro 2", "Active noise cancellation, USB-C", 249.99, 40, headphones));
        productRepository.save(createProduct("Sony WH-1000XM5", "Industry-leading noise cancellation", 349.99, 25, headphones));
        productRepository.save(createProduct("iPad Air M2", "11-inch, 128GB, Liquid Retina display", 599.99, 18, tablets));
        productRepository.save(createProduct("Samsung Galaxy Tab S9", "11-inch, 256GB, AMOLED display", 699.99, 12, tablets));
    }

    private Product createProduct(String name, String description, double price, int stock, Category category) {
        Product p = new Product();
        p.setName(name);
        p.setDescription(description);
        p.setPrice(BigDecimal.valueOf(price));
        p.setStock(stock);
        p.setImageUrl("/images/" + name.toLowerCase().replaceAll("\\s+", "-") + ".jpg");
        p.setCategory(category);
        return p;
    }
}
