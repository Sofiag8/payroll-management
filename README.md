<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">This repository contains a sample NestJS application demonstrating several backend development skills, particularly focusing on JavaScript and TypeScript. The project showcases clean and understandable code, leveraging NestJS framework's advantages for modularity, maintenance, and scalability. Also integrates with the HubSpot API to manage contact and company objects.</p>
    <p align="center">

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Why NestJS?

[NestJS](https://github.com/nestjs/nest) is a powerful framework for building efficient, reliable, and scalable server-side applications. Here's why it's beneficial, especially when TypeScript is a requirement:

- Type Safety: TypeScript ensures type safety, reducing runtime errors and improving code maintainability.

- Modular Architecture: NestJS promotes a modular architecture, making it easier to organize code into reusable and independent modules.

- Decorator-based Programming: Leveraging decorators simplifies code structuring and enhances readability.

- Built-in Dependency Injection: NestJS provides built-in dependency injection, facilitating the creation of loosely coupled components.

## Business Context?

This sample application reflects a real-world scenario where HubSpot CRM integration was required for a payroll management system. The project involved handling users, company, employees, and employers data within the application, requiring integration with HubSpot for sales and marketing departments.

### Implementation Details

- HubSpot Integration: Implemented using NestJS modules and services to interact with the HubSpot CRM API.
- AWS S3 Integration: Managed user profile picture uploads to AWS S3 for storage.
- Third-Party Email Integration: Integrated third-party email services for validation and communication purposes.

## Application Features

This sample application includes the following features:

- TypeORM for PostgreSQL: Utilized TypeORM for PostgreSQL database management, ensuring data integrity and reliability, crucial for financial applications like payroll management.

- Authentication: Implemented JWT-based signup and signin functionalities for user authentication.

- Authorization: Utilized Passport strategy and custom NestJS guards for secure route authorization.

- Password Hashing: Employed bcrypt library for secure password hashing and decryption.

- Data Validation: Implemented DTOs for request data validation and interfaces for type safety.

- Hubspot CRM API: integrates with the HubSpot API to manage [contacts](https://developers.hubspot.com/docs/api/crm/contacts) and [companies](https://developers.hubspot.com/docs/api/crm/companies) objects. Company to Contact association.

- TypeORM [Subscribers](https://orkhan.gitbook.io/typeorm/docs/listeners-and-subscribers): Used TypeORM subscribers for handling HubSpot contacts and companies creation before inserting at entities.

## Installation and Usage

To run the application, follow these steps:

### Externals

```bash
docker-compose --env-file .env up -d
```

- Clone this repository.
- Install dependencies using npm install or yarn install.
- Set up environment variables as per .env.example.
- Run the application in development mode using

```
yarn start:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
