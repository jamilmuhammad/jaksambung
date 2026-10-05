# Delta for Pilot Inquiry

## ADDED Requirements

### Requirement: Qualified pilot inquiry

The site SHALL let a prospective customer provide enough context for a pilot discussion.

#### Scenario: Visitor completes the inquiry

- **WHEN** a visitor submits valid required fields
- **THEN** the submission includes their name, work email, organization, city, customer type, event type or context, and pilot objective
- **AND** the form shows a pending state while awaiting confirmation

#### Scenario: Visitor provides invalid data

- **WHEN** a visitor omits a required value or enters an invalid email address
- **THEN** submission is prevented
- **AND** the relevant field receives a specific accessible error message
- **AND** previously entered valid values remain available

### Requirement: Truthful submission outcome

The form SHALL distinguish confirmed delivery, delivery failure, and local demo behavior.

#### Scenario: Configured endpoint confirms delivery

- **GIVEN** a production submission endpoint is configured
- **WHEN** it confirms receipt
- **THEN** the visitor sees a success message confirming that the inquiry was received
- **AND** duplicate submission is prevented while the request is pending

#### Scenario: Configured endpoint rejects or fails

- **GIVEN** a production submission endpoint is configured
- **WHEN** it rejects the submission or cannot be reached
- **THEN** the visitor sees an error that explains the inquiry was not confirmed
- **AND** their entered values remain available for retry

#### Scenario: No endpoint is configured in development

- **GIVEN** the site is running outside production without a submission endpoint
- **WHEN** a valid form is submitted
- **THEN** the interface demonstrates the success state
- **AND** it explicitly states that no inquiry was transmitted

#### Scenario: No endpoint is configured in production

- **GIVEN** the production site has no submission endpoint
- **WHEN** the form is rendered
- **THEN** it does not claim that inquiries can be delivered
- **AND** it provides Muhammad Jamil's configured WhatsApp contact or disables submission with a clear explanation

### Requirement: Founder contact fallback

The site SHALL offer Muhammad Jamil's verified WhatsApp number as the direct pilot-contact fallback.

#### Scenario: Visitor chooses WhatsApp contact

- **WHEN** a visitor activates the WhatsApp contact action
- **THEN** the site opens `https://wa.me/6281219561519` with concise pilot-inquiry context
- **AND** the visible contact number is formatted as `+62 812-1956-1519`
- **AND** the action is identified as opening the third-party WhatsApp service

### Requirement: Inquiry privacy and spam resistance

The form SHALL minimize unnecessary data exposure and include baseline automated-submission resistance.

#### Scenario: Visitor reviews data use

- **WHEN** a visitor prepares to submit the form
- **THEN** they can access the first-party `/privacy` notice near the submit action
- **AND** the form does not request sensitive personal data unrelated to pilot qualification

#### Scenario: Submission is processed

- **WHEN** form data is transmitted
- **THEN** it is sent only to the configured HTTPS endpoint
- **AND** form values are not written to browser or server logs by the application
- **AND** a hidden honeypot field is evaluated before transmission
