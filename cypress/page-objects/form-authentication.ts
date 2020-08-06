import { BasePage } from './base'

export class FormAuthPage extends BasePage {

  FORM_AUTH_URL = '/login'
  LOGIN_BUTTON = 'button.radius'

  navigateTo() {
    cy.visit(this.FORM_AUTH_URL)
  }
}