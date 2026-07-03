## ADDED Requirements

### Requirement: Place Order
The system SHALL allow authenticated users with a non-empty cart to place an order with mock payment.

#### Scenario: Successful order placement
- **GIVEN** the cart contains 3 items with a total of $150.00
- **WHEN** the user submits the checkout with shipping details
- **THEN** an order is created with status "CONFIRMED"
- **AND** the cart is cleared
- **AND** product stock quantities are reduced
- **AND** a 201 Created response returns the order details

#### Scenario: Checkout with empty cart
- **GIVEN** the cart is empty
- **WHEN** the user tries to place an order
- **THEN** a 400 Bad Request response is returned

#### Scenario: Mock payment processing
- **GIVEN** a valid order with total $150.00
- **WHEN** the mock payment gateway is called
- **THEN** the payment is marked as "PAID" (simulated)

#### Scenario: Checkout with insufficient stock
- **GIVEN** the cart contains "Wireless Mouse" with quantity 5
- **WHEN** stock drops to 2 during checkout
- **THEN** a 409 Conflict response is returned with an insufficient stock message

### Requirement: Order Confirmation
The system SHALL display an order confirmation with a summary after successful placement.

#### Scenario: View order confirmation
- **GIVEN** an order was just placed successfully
- **WHEN** the confirmation page loads
- **THEN** the order ID, line items, total, shipping address, and status are displayed
