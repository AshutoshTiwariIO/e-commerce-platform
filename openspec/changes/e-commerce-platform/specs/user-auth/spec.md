## ADDED Requirements

### Requirement: User Registration
The system SHALL allow a new user to register with a unique email and a password of at least 6 characters.
Feature: User Authentication

#### Scenario: Successful registration
- **GIVEN** the user provides a valid email, a password with 6+ characters, and a display name
- **WHEN** the registration request is submitted
- **THEN** the account is created and a JWT token is returned

#### Scenario: Duplicate email registration
- **GIVEN** an account already exists with email "test@example.com"
- **WHEN** a registration request with the same email is submitted
- **THEN** a 409 Conflict response is returned with an error message

#### Scenario: Weak password rejected
- **GIVEN** the user provides a password with fewer than 6 characters
- **WHEN** the registration request is submitted
- **THEN** a 400 Bad Request response is returned with a validation error

### Requirement: User Login
The system SHALL authenticate registered users via email and password and return a JWT.

#### Scenario: Successful login
- **GIVEN** a registered user with email "test@example.com" and correct password
- **WHEN** the login request is submitted
- **THEN** a JWT token is returned with 15-minute expiry

#### Scenario: Invalid credentials
- **GIVEN** a registered user with email "test@example.com"
- **WHEN** the login request is submitted with an incorrect password
- **THEN** a 401 Unauthorized response is returned

### Requirement: Profile Retrieval
The system SHALL return the authenticated user's profile details.

#### Scenario: Get own profile
- **GIVEN** a valid JWT token for a registered user
- **WHEN** a GET request is made to the profile endpoint
- **THEN** the user's display name, email, and join date are returned
