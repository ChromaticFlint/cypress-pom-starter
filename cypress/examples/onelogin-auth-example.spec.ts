import { LandingPage } from '../page-objects/landing-page'
import Auth from '../page-objects/auth'

// Move this to the integration folder if you intend to use it.
// Make sure you enable the before each statement wihtin ../../support/index.js to ensure local storage is set.
describe('Should authenticate usinig Puppeteer through a One Login Auth that has seperate steps for entering Username and Password', () => {
  context('Authentication Example', () => {
  const landingPage: LandingPage = new LandingPage()

    before(() => {
      // setting up authentication
      const environments: string[] = Object.keys(Cypress.env('domains'))
      const environment: string = environments[Cypress.env('target')]
      Cypress.env('authUrl', Cypress.env('domains')[environment]['defaultApplication'])
      const email: string = Cypress.env('credentials').User1.Email
      const password: string = Cypress.env('credentials').User1.Password
      const auth_url: string = Cypress.env('domains')[environment]['authUrl']

      // authenticating in Puppetter and passing local storage to Cypress
      const auth: Auth = new Auth({
        email,
        password,
        auth_url
      })
      auth.login()

      cy.then(() => {
        expect(Cypress.env('TokenSet')).to.equal(true, "If this passed, authentication succeeded and passed localStorage to Cypress.")
      })
    })

    it('should authenticate and navigate to the Dashboard', () => {
      landingPage.navigateTo()
      landingPage.shouldBeVisible('') // Set this to the selector of a element that is visable only after authentication.
    })
  })
})