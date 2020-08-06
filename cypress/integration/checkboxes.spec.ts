import { Checkboxes } from './../page-objects/checkboxes';

describe('Form Authentication Example Test', () => {
  context('These are the example tests for the form authentication page for /checkboxes', () => {
    const checkboxes: Checkboxes = new Checkboxes

    it('should navigate to the form authentication page baseUrl + /checkboxes', () => {
      checkboxes.navigateTo()
      checkboxes.shouldBeVisible(checkboxes.CHECKBOXES_HEADER)
      checkboxes.shouldBeVisible(checkboxes.CHECKBOX_ONE)
      checkboxes.shouldBeVisible(checkboxes.CHECKBOX_TWO)
    })
  })
})