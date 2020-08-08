export class BasePage {
  sendString(selector: string, text: string) {
    return cy.get(selector).type(text);
  }

  urlShouldContain(text: string) {
    return cy.url().should('include', text);
  }

  clear(selector: string) {
    return cy.get(selector).clear();
  }

  shouldBeVisible(selector: string) {
    return cy.get(selector).should('be.visible');
  }

  shouldContainText(selector: string, text: string) {
    return cy.get(selector).should('contain.text', text);
  }

  containsText(selector: string, text: string) {
    return cy.contains(selector, text);
  }

  waitFor(selector: string) {
    return cy.get(selector, {timeout: 5000}).should('be.visible');
  }

  waitForThanToDissapear(selector: string) {
    cy.get(selector, {timeout: 2000}).should('be.visible');
    cy.get(selector, {timeout: 5000}).should('not.exist');
  }
}
