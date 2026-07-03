## ADDED Requirements

### Requirement: View Order History
The system SHALL return the authenticated user's past orders sorted by date descending.

#### Scenario: List past orders
- **GIVEN** the user has placed 5 orders in the past
- **WHEN** the user requests their order history
- **THEN** a paginated list of orders is returned, sorted by date (newest first)

#### Scenario: Order history for new user
- **GIVEN** the user has never placed an order
- **WHEN** the user requests their order history
- **THEN** an empty list is returned

### Requirement: View Order Details
The system SHALL return the full details of a specific past order for the authenticated user.

#### Scenario: View single order details
- **GIVEN** an order with ID 1 exists for this user
- **WHEN** the user requests order details for ID 1
- **THEN** the order ID, date, status, line items, quantities, prices, and shipping address are returned

#### Scenario: View another user's order
- **GIVEN** order ID 2 belongs to a different user
- **WHEN** the user requests order details for ID 2
- **THEN** a 403 Forbidden response is returned
