# Cypress Page Object Model Starter

## Table of Contents
1. [Pre-Requisites](#pre-requisites)
2. [Getting Cypress Running](#getting-cypress-running)
3. [Configuring Cypress Credentials and Environments](#configuring-cypress-credentials-and-environments)
4. [Contributing](#contributing)
5. [Getting started with writing tests](#getting-started-with-writing-tests)

## Pre-Requisites
- Download
  - a recent/current version of [Node.js](https://nodejs.org/en/)
- Optional Download
  - [A code editor that supports code completion](https://docs.cypress.io/guides/tooling/IDE-integration.html#Intelligent-Code-Completion)
  - Recommendation: [VS Code](https://code.visualstudio.com/)

## Getting Cypress Running
- Git clone the repo using `git clone https://github.com/ChromaticFlint/cypress-pom-starter`
- Navigate into the repo root directory.
- Install the dependencies with `npm install`
- In the project root, make a copy of `cypress.env.json` and name it `cypress.env-example.json`.
- Start Cypress for the environment of test that you would like to interact with the following scripts based on the `package.json` scripts:
  - Running Local with the UI: `npm run cypress:local`
  - Running Local headlessly: `npm run cypress:headless`
  - Running Staging with the UI: `npm run cypress:staging`
  - Running Staging headlessly: `npm run cypress:staging:headless`
  - Running Prod with the UI: `npm run cypress:prod`
  - Running Prod with headlessly: `npm run cypress:prod:headless`
- Launch your tests from the Cypress test runner if you used the UI, or observe the test running headlessly within the command line interface.
  - By default if you run `npm run cypress:prod` the `https://the-internet.herokuapp.com/` test should run successfully if everything is configured appropriately.

## Configuring Cypress Credentials and Environments

### Cypress Credentials
When working with user credentials you should always avoid committing them to Git/GitHub. Instead, you can distribute an `cypress.env-example.json` file with the sensitive data removed. You can then share the necessary info via a password manager or another form. (Not over public slack channels...)

### Steps for configuring the cypress.env.json file
1. Rename the `cypress.env-example.json` file to `cypress.env.json`
2. Profit

### Steps for configuring cypress.env credentials.
1. Within `cypress.env.json` within credentials, create any set of credentials required.
2. _access these credentials within your tests through `Cypress.env('credentials').<NAMEOFUSER>.email` and `Cypress.env('credentials').<NAMEOFUSER>.password` respectively_

### Cypress Environments
When working with multiple environments of test it is helpful to quickly be able to test different environments locally,  or switch environments of test within a CI/CD pipeline. Without odd various of SSO this can be achieved through the `package.json` scripts, or with the One Login SSO example included in this repo through both the `package.json` script and the `cypress.env.json` file.

#### Non SSO
1. Within `package.json` locate the scripts section.
2. Adjust the `--config baseUrl=<URL>` to the application of test.
3. Adjust the script accordingly, all scripts are run with `npm run <SCRIPTNAME>` _see examples from the **getting cypress running** section_

#### SSO - Specifically Onelogin with a separate step between username and password entry (I don't recommend this)
- Manually identify in you application if you require the following:
  - SSO Authentication, where the SSO service doesn't have an API.
    - Use `cy.request()` to authenticate the the SSO API
  - SSO Authetnication, where the SSO service has multiple steps in the log in process
    - Use a combination of postman to identify the payload needed to login, and then use `cy.request()` to submit the request.
  - SSO Authentication, where the authentication URL is outside of the base domain of test.
    - Again... Use `cy.request()`
    - Also you are going to want to copy that URL, make sure to get each one if they are different per environment.
- If `cy.request()` still didn't fit your need, I'm sorry lets use puppeteer.

1. Move the `/cypress/examples/onelogin-auth-example.spec.ts` file into the integration folder.
2. Uncomment the `beforeEach()` statement in `/cypress/support/index.js`
3. If an authentication URL is required outside of the application URL.
  - Open `cypress.env.json` for each environment add a new key to the environment for the authentication domain.
    - See example below, Application auth was added to `local`, you will need this for all environments of test. Name it `authUrl` if you are planning on using the `onelogin-auth-example` `before()` code.

```json
"domains": {
    "local": {
      "defaultApplication": "https://localhost:4200/this_is_an_example",
      "authUrl": "https://applicationauth.why/"
    },
    "staging": {
      "defaultApplication": "https://staging.the-internet.herokuapp.com/this_is_an_example"
    },
    "prod": {
      "defaultApplication": "https://the-internet.herokuapp.com/"
    }
```

4. Open `/cypress/support/getOneLoginAuth.js` and manually perform the SSO Login. Adjust the selectors within `getOneLoginAuth` to the necessary selectors for puppeteer to login.
5. Finally, adjust the `--config baseUrl=<URL>` to the application of test.
6. Adjust the script accordingly, all scripts are run with `npm run <SCRIPTNAME>` _see examples from the **getting cypress running** section_ 
7. There could be a number of things that go wrong here:
  - First could be imports from moving files around.
  - Second would probably be how the `getOneLogiinAutth.js` is set up, this can go poorly if the site is slow, you might need to set some waits unfortunately. You can troubleshoot by setting `headless` to false on line 6.
  - Third, funny enough would be if `tsconfig.json` has `allowJs` set to `true`, this will break the puppeteer `async` function.
  - Fourth could just be the jankey code this is using to perform the auth. :shrug: as I said, I don't recommend this.

## Getting started with writing tests
### Structure 
- The Cypress automation code organization is leveraging a class inheritance page object model structure.
  - The Base page object is located within `<root>/cypress/page-objects/base.ts`
    - This page object will contain all of the global methods that are required by any page object. The goal of these methods is to extent Cypress' functionality to be easier and debateably faster to write.
  - All page-object will inherit from the base page object and be located within the page-objects folder located at `<root>/cypress/page-objects`
    - These page objects will contain the methods to interact with the application corresponding with each page within the application.
    - In each page object will manage and contain all of the selectors and ids for the page elements that would exist on a given page.
    - Example page-objects in default suite. `/cypress/page-objects/landing-page.ts`, `/cypress/page-objects/checkboxes.ts`
- The integration folder will contain all of our tests.
  - the integration folder is located at `<root>/cypress/integration`
  - the integration folder is formatted almost identically to the page-objects model folder so, there is a corresponding director for the compass and atlas application.
  - Example test files in default suite. `/cypress/integration/landing-page.spec.ts`, `/cypress/integration/checkboxes.spec.ts`
  - Each individual page will have a `spec.ts` file within the appropriate integration folder _if the application is large, it might be helpful to start organizating the spec files per section of the application_. This spec file should contain all of tests that occur for that specific page.

## Contributing

Contributions to this repository is encouraged and appreciated. If you would like to please create a fork of the repo and submit a PR, or submit and issue. Thank you.