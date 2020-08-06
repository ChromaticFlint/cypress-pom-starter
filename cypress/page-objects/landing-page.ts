import { BasePage } from './base'

export class LandingPage extends BasePage {

  HEADER_TEXT = '.heading'

  FORM_AUTHENTICATION_LINK_TEXT = 'Form Authentication'

  navigateTo() {
    cy.visit('/')
  }
}