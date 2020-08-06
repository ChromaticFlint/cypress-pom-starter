import { FormAuthPage } from '../page-objects/form-authentication';
import { LandingPage } from '../page-objects/landing-page';

describe('Landing Page Example Test', () => {
  context('These are the example tests for the landing page for: baseUrl - https://the-internet.herokuapp.com/', () => {
  const landingPage = new LandingPage()
  const formAuthPage: FormAuthPage = new FormAuthPage()

    it('should navigate to the landing page', () => {
      landingPage.navigateTo()
      landingPage.containsText(landingPage.HEADER_TEXT, 'Welcome to the-internet')
    })

    it('should click the form authentication link and navigate to the /login page', () => {
      landingPage.navigateTo()
      landingPage.containsText('a', landingPage.FORM_AUTHENTICATION_LINK_TEXT).click()
      landingPage.urlShouldContain(formAuthPage.FORM_AUTH_URL)
    })
  })
})