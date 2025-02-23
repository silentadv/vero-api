# Vero API

Vero is an application that provides a workspace for organizations to manage their service offerings.

## Functional Requirements (RFs)

- [x] Users should be able to register.
- [x] Users should be able to authenticate.
- [x] Users should be able to create an organization.
- [ ] Users should be able to join an organization upon invitation.

- [x] It should be possible to organization create an service.
- [ ] It should be possible to organization members view services.

## Rules (RNs)

- [x] It should not be possible to user register with same email.
- [x] It should not be possible to create an organization with same slug.
- [x] When a user creates an organization,
      they must be automatically added as a member with the 'owner' role.
- [x] Magic-links must expire in 20 minutes.

- [ ] It should not be possible to organization create an service with same name.
- [ ] It should not be possible to organization member create an service, only owner or admins.
- [ ] It should not be possible to create a service in an organization if the user is not a member.

## Non-functional Requirements (NRFs)

- [x] The application data must be persisted in a PostgreSQL database.
- [x] The authentication system must be based on magic links.
- [ ] User must be identified using an JWT (Json Web Token).

## To-do

- [x] Create "create magic-link use case"
