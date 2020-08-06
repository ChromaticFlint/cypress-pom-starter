import { BasePage } from './base'

export class Checkboxes extends BasePage {

  CHECKBOXES_URL = '/checkboxes'
  CHECKBOXES_HEADER = 'h3'
  CHECKBOX_ONE = '#checkboxes > :nth-child(1)'
  CHECKBOX_TWO = '#checkboxes > :nth-child(3)'

  navigateTo() {
    cy.visit(this.CHECKBOXES_URL)
  }
}