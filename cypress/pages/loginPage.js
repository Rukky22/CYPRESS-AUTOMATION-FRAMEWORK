/**
 * Login Page Object Model
 */

class LoginPage {
  // Locators
  get usernameInput() {
    return cy.get('#username');
  }
  get passwordInput() {
    return cy.get('#password');
  }
  get loginButton() {
    return cy.get('#loginButton');
  }
  get errorMessage() {
    return cy.get('#errorMessage');
  }

  /**
   * Navigate to login page
   */
  visit(url = '/login') {
    cy.visit(url);
    cy.url().should('include', '/login');

    // Wait for page elements to load
    this.usernameInput.should('be.visible');
    this.passwordInput.should('be.visible');
    this.loginButton.should('be.visible');
  }

  /**
   * Enter username
   */
  enterUsername(username) {
    cy.log(`Entering username: ${username}`);
    this.usernameInput.clear().type(username);
  }

  /**
   * Enter password
   */
  enterPassword(password) {
    cy.log('Entering password');
    this.passwordInput.clear().type(password);
  }

  /**
   * Click login button
   */
  clickLoginButton() {
    cy.log('Clicking login button');
    this.loginButton.click();
  }

  /**
   * Complete login flow
   */
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  /**
   * Verify successful login
   */
  verifySuccessfulLogin(expectedUrl = '/dashboard') {
    cy.log('Verifying successful login');
    cy.url({ timeout: 10000 }).should('include', expectedUrl);

    // Ensure no error message is displayed
    cy.get('body').then(($body) => {
      if ($body.find('#errorMessage').length > 0) {
        this.errorMessage.should('not.be.visible');
      }
    });
  }

  /**
   * Verify login failure with error message
   */
  verifyLoginFailure(expectedError) {
    cy.log('Verifying login failure');
    this.errorMessage
      .should('be.visible', { timeout: 5000 })
      .and('contain.text', expectedError);

    // Should still be on login page
    cy.url().should('include', '/login');
  }

  /**
   * Verify password field is masked
   */
  verifyPasswordIsMasked() {
    this.passwordInput.should('have.attr', 'type', 'password');
  }

  /**
   * Verify all form elements exist
   */
  verifyFormElements() {
    this.usernameInput.should('exist');
    this.passwordInput.should('exist');
    this.loginButton.should('exist');
  }
}

export default LoginPage;
