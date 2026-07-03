## ADDED Requirements

### Requirement: Admin Authentication
The system SHALL restrict admin endpoints to users with the ADMIN role.

#### Scenario: Admin login
- **GIVEN** an admin user exists with role "ADMIN"
- **WHEN** the admin logs in with valid credentials
- **THEN** a JWT token with admin role claim is returned

#### Scenario: Non-admin access denied
- **GIVEN** a regular authenticated user
- **WHEN** the user requests an admin endpoint
- **THEN** a 403 Forbidden response is returned

### Requirement: Manage Products
The system SHALL allow admins to create, update, and delete products.

#### Scenario: Create a new product
- **GIVEN** an authenticated admin user
- **WHEN** the admin submits a new product with name, description, price, category, image URL, and stock
- **THEN** the product is created and returned with a 201 Created response

#### Scenario: Update an existing product
- **GIVEN** a product with ID 1 exists
- **WHEN** the admin updates the price and stock of product ID 1
- **THEN** the product is updated with the new values

#### Scenario: Delete a product
- **GIVEN** a product with ID 1 exists
- **WHEN** the admin deletes product ID 1
- **THEN** the product is removed from the catalog

### Requirement: Manage Orders
The system SHALL allow admins to view all orders and update order status.

#### Scenario: List all orders
- **GIVEN** 20 orders exist across all users
- **WHEN** the admin requests all orders
- **THEN** a paginated list of all orders is returned

#### Scenario: Update order status
- **GIVEN** an order with status "CONFIRMED"
- **WHEN** the admin updates the status to "SHIPPED"
- **THEN** the order status is updated

### Requirement: Manage Categories
The system SHALL allow admins to create and delete categories.

#### Scenario: Create a new category
- **GIVEN** an authenticated admin user
- **WHEN** the admin creates a category "Headphones"
- **THEN** the category is created and returned

#### Scenario: Delete a category
- **GIVEN** category "Headphones" has no associated products
- **WHEN** the admin deletes the category
- **THEN** the category is removed
