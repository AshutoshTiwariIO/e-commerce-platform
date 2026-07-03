## ADDED Requirements

### Requirement: Add to Cart
The system SHALL allow authenticated users to add products to their cart with stock validation.

#### Scenario: Add an item to cart
- **GIVEN** an authenticated user and a product with sufficient stock
- **WHEN** the user adds 1 unit of the product to the cart
- **THEN** the item appears in the cart with quantity 1

#### Scenario: Add an item that already exists in cart
- **GIVEN** the cart already contains 2 units of "Wireless Mouse"
- **WHEN** the user adds 1 more unit of "Wireless Mouse"
- **THEN** the cart quantity for that item updates to 3

#### Scenario: Add item with insufficient stock
- **GIVEN** "Wireless Mouse" has only 2 units in stock
- **WHEN** the user tries to add 5 units to the cart
- **THEN** a 400 Bad Request response is returned with a stock limit message

### Requirement: View Cart
The system SHALL return the authenticated user's cart with itemized details.

#### Scenario: View cart contents
- **GIVEN** the cart contains 3 items from different products
- **WHEN** the user requests their cart
- **THEN** all items are returned with product name, quantity, unit price, and subtotal

### Requirement: Update Cart Quantity
The system SHALL allow authenticated users to update item quantities in their cart.

#### Scenario: Increase quantity
- **GIVEN** "Wireless Mouse" is in the cart with quantity 1
- **WHEN** the user updates quantity to 3
- **THEN** the cart shows quantity 3 for that item

#### Scenario: Decrease quantity to zero removes item
- **GIVEN** "Wireless Mouse" is in the cart with quantity 2
- **WHEN** the user updates quantity to 0
- **THEN** the item is removed from the cart

### Requirement: Remove from Cart
The system SHALL allow authenticated users to remove items from their cart.

#### Scenario: Remove a cart item
- **GIVEN** "Wireless Mouse" is in the cart
- **WHEN** the user removes that item
- **THEN** the item is no longer in the cart

### Requirement: Clear Cart
The system SHALL allow authenticated users to clear all items from their cart.

#### Scenario: Clear entire cart
- **GIVEN** the cart contains 5 items
- **WHEN** the user clears the cart
- **THEN** the cart is empty
