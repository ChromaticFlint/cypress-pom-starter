export default class Auth {
  email: string;
  password: string;
  url: string;
  auth_url: string;
  constructor(user: any, url = '/') {
    const {email, password, auth_url} = user;
    this.email = email;
    this.password = password;
    this.url = url;
    this.auth_url = auth_url;
  }

  login() {
    cy.task('getOneLoginAuth', {
      email: this.email,
      password: this.password,
      url: Cypress.config('baseUrl'),
      auth_url: this.auth_url,
    }).then(credentials => {
      const authneticationTokens = {AuthenticationTokens: credentials};
      Cypress.env(authneticationTokens);
      if (credentials === 0) {
        Cypress.env('TokenSet', false);
      } else {
        Cypress.env('TokenSet', true);
      }
    });
  }
}
