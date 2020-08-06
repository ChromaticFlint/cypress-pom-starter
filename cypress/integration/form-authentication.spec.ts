import { FormAuthPage } from '../page-objects/form-authentication';

describe('Form Authentication Example Test', () => {
  context('These are the example tests for the form authentication page for /login', () => {
  const formAuthPage: FormAuthPage = new FormAuthPage()

    it('should navigate to the form authentication page baseUrl + /login', () => {
      formAuthPage.navigateTo()

      // Add othere login page elements here
      formAuthPage.shouldBeVisible(formAuthPage.LOGIN_BUTTON)
    })
  })
})