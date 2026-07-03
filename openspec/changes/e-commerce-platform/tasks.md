## 1. Project Setup

- [x] 1.1 Initialize Spring Boot project with dependencies (Spring Web, JPA, Security, H2, Validation, Swagger)
- [x] 1.2 Initialize React.js project with React Router
- [x] 1.3 Configure H2 database, CORS, and application properties
- [x] 1.4 Create base project structure (packages, directories)
- [x] 1.5 Set up JWT utility (token generation, validation, expiry)

## 2. Data Model & Repositories

- [x] 2.1 Create User entity and UserRepository
- [x] 2.2 Create Category entity and CategoryRepository
- [x] 2.3 Create Product entity and ProductRepository
- [x] 2.4 Create Cart entity, CartItem entity, and CartRepository
- [x] 2.5 Create Wishlist entity and WishlistRepository
- [x] 2.6 Create Order entity, OrderItem entity, and OrderRepository
- [x] 2.7 Seed database with sample electronics categories and products

## 3. User Authentication — Backend

- [x] 3.1 Create AuthController (register, login, profile endpoints)
- [x] 3.2 Create AuthService with password hashing and JWT generation
- [x] 3.3 Implement JWT authentication filter
- [x] 3.4 Implement role-based authorization for admin endpoints
- [x] 3.5 Add validation for registration inputs

## 4. User Authentication — Frontend

- [x] 4.1 Create Login page and Register page components
- [x] 4.2 Implement apiClient utility with JWT token management
- [x] 4.3 Create AuthContext for global auth state
- [x] 4.4 Implement protected route wrapper and redirect logic
- [x] 4.5 Create NavBar with login/logout and user display

## 5. Product Catalog — Backend

- [x] 5.1 Create ProductController (list, search, filter, details)
- [x] 5.2 Create ProductService with search/filter logic
- [x] 5.3 Create CategoryController (list categories)

## 6. Product Catalog — Frontend

- [x] 6.1 Create ProductList page with grid display
- [x] 6.2 Create ProductDetail page
- [x] 6.3 Create category filter and search bar
- [x] 6.4 Implement pagination for product listing

## 7. Shopping Cart — Backend

- [x] 7.1 Create CartController (add, view, update, remove, clear)
- [x] 7.2 Create CartService with stock validation logic

## 8. Shopping Cart — Frontend

- [x] 8.1 Create CartContext for global cart state
- [x] 8.2 Create CartPage component (item list, quantity controls, totals)
- [x] 8.3 Add cart badge to NavBar
- [x] 8.4 Implement add-to-cart button on ProductDetail

## 9. Wishlist — Backend

- [x] 9.1 Create WishlistController (add, view, remove, move to cart)
- [x] 9.2 Create WishlistService

## 10. Wishlist — Frontend

- [x] 10.1 Create WishlistContext for global wishlist state
- [x] 10.2 Create WishlistPage component
- [x] 10.3 Add wishlist toggle button on ProductDetail and ProductList

## 11. Checkout — Backend

- [x] 11.1 Create OrderController (place order)
- [x] 11.2 Create OrderService with mock payment processing
- [x] 11.3 Implement stock deduction on order placement

## 12. Checkout — Frontend

- [x] 12.1 Create CheckoutPage (order summary, shipping form)
- [x] 12.2 Create OrderConfirmation component
- [x] 12.3 Implement cart-to-checkout flow

## 13. Order History — Backend

- [x] 13.1 Create OrderController (list orders, order details)

## 14. Order History — Frontend

- [x] 14.1 Create OrderHistoryPage
- [x] 14.2 Create OrderDetailPage

## 15. Admin Panel — Backend

- [x] 15.1 Create AdminController (product CRUD, order management, category management)
- [x] 15.2 Create AdminService
- [x] 15.3 Implement admin role check in security config

## 16. Admin Panel — Frontend

- [x] 16.1 Create AdminDashboard layout with navigation
- [x] 16.2 Create ProductManagement page (create/edit/delete products)
- [x] 16.3 Create OrderManagement page (list orders, update status)
- [x] 16.4 Create CategoryManagement page (add/delete categories)
- [x] 16.5 Implement admin route guard

## 17. Final Integration & Validation

- [x] 17.1 End-to-end testing of all flows
- [x] 17.2 Run `openspec validate e-commerce-platform --type change --strict`
