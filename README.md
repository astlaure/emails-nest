<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Emails Nest

## Description

Emails Nest application send emails generated with Mjml and Handlebars.

## Installation

```bash
$ npm install
```

## Running the app

**Please use MailHog to trap your local emails**

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Possible Changes

1. Create a dto for each templates and manually validate it based on the template property in the body
2. Create 2 enums for the templates and the locales
