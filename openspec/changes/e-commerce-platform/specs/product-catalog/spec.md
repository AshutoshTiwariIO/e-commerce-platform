## ADDED Requirements

### Requirement: Browse Products
The system SHALL display a paginated list of products with category filtering and search.
Rule: Products have a name, description, price, category, image URL, and stock quantity.

#### Scenario: List all products
- **GIVEN** the catalog contains 10 products across 3 categories (Laptops, Phones, Accessories)
- **WHEN** a GET request is made to the products endpoint
- **THEN** a paginated list of all products is returned with their details

#### Scenario: Filter by category
- **GIVEN** products exist in categories "Laptops", "Phones", and "Accessories"
- **WHEN** a GET request is made with category filter "Laptops"
- **THEN** only products in the "Laptops" category are returned

#### Scenario: Search by name
- **GIVEN** products include "Wireless Mouse" and "Gaming Keyboard"
- **WHEN** a GET request is made with search term "Mouse"
- **THEN** only matching products (e.g., "Wireless Mouse") are returned

#### Scenario: View product details
- **GIVEN** a product exists with ID 1
- **WHEN** a GET request is made to the product details endpoint for ID 1
- **THEN** the full product details (name, description, price, stock, image) are returned

### Requirement: Category Management
The system SHALL list all available product categories.

#### Scenario: List all categories
- **GIVEN** categories "Laptops", "Phones", and "Accessories" exist
- **WHEN** a GET request is made to the categories endpoint
- **THEN** all category names and IDs are returned
