# Vero API

Vero is an application that provides a workspace for organizations to manage their service offerings.

## Functional Requirements (RFs)

- [x] Users should be able to register.
- [x] Users should be able to authenticate.
- [ ] Users should be able to create an organization.
- [ ] Users should be able to join an organization upon invitation.

## Rules (RNs)

- [ ] It should not be possible to UserRegister with same email.
- [ ] When a user creates an organization,
      they must be automatically added as a member with the 'owner' role.
- [x] Magic-links must expire in 20 minutes.

## Non-functional Requirements (NRFs)

- [x] The application data must be persisted in a PostgreSQL database.
- [x] The authentication system must be based on magic links.
- [ ] User must be identified using an JWT (Json Web Token).

## To-do

- [ ] Create "create magic-link use case"
