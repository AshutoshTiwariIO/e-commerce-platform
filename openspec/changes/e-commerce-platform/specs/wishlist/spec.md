## ADDED Requirements

### Requirement: Add to Wishlist
The system SHALL allow authenticated users to save products to their wishlist.

#### Scenario: Add an item to wishlist
- **GIVEN** an authenticated user and a product exists
- **WHEN** the user adds the product to their wishlist
- **THEN** the product appears in the user's wishlist

#### Scenario: Add duplicate item to wishlist
- **GIVEN** "Wireless Mouse" is already in the wishlist
- **WHEN** the user tries to add "Wireless Mouse" again
- **THEN** a 409 Conflict response is returned

### Requirement: View Wishlist
The system SHALL return all items in the authenticated user's wishlist.

#### Scenario: View wishlist contents
- **GIVEN** the wishlist contains 3 products
- **WHEN** the user requests their wishlist
- **THEN** all saved products with details are returned

### Requirement: Remove from Wishlist
The system SHALL allow authenticated users to remove items from their wishlist.

#### Scenario: Remove an item from wishlist
- **GIVEN** "Wireless Mouse" is in the wishlist
- **WHEN** the user removes it
- **THEN** "Wireless Mouse" is no longer in the wishlist

### Requirement: Move from Wishlist to Cart
The system SHALL allow authenticated users to move a wishlist item directly to their cart.

#### Scenario: Move wishlist item to cart
- **GIVEN** "Wireless Mouse" is in the wishlist and not in the cart
- **WHEN** the user moves it to the cart
- **THEN** "Wireless Mouse" is added to the cart with quantity 1 and removed from the wishlist
