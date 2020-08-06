// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:

// Template for Authenticating
// require('./commands')
// before(() => {
// const email = Cypress.env('Org1StandardEmail')
// const password = Cypress.env('Org1StandardPassword')
//   const page = new Page({
//     email,
//     password
//   });
//   page.login()
// })

// Enable if you need to set Puppeteer Local Storage to Cypress' Local Storage with getOneLoginAuth
// beforeEach(() => {
//   const authentication = Cypress.env('AuthenticationTokens')
//   for (let [key, value] of Object.entries(authentication)) {
//     localStorage.setItem(key, value)
//   }
// })
