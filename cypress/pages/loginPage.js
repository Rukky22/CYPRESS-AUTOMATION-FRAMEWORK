class LoginPage {
  visit(url = "/login") {
    cy.visit(url);
    cy.url().should("include", "/login");
  }

  enterUsername(username) {
    cy.get("#username").clear().type(username);
  }

  enterPassword(password) {
    cy.get("#password").clear().type(password);
  }

  clickLoginButton() {
    cy.get("#loginButton").click();
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  verifySuccessfulLogin(expectedUrl = "/dashboard") {
    cy.url({ timeout: 10000 }).should("include", expectedUrl);
    cy.get("#errorMessage").should("not.exist");
  }

  verifyLoginFailure(expectedError) {
    cy.get("#errorMessage", { timeout: 5000 })
      .should("be.visible")
      .and("contain.text", expectedError);
  }
}

export default LoginPage;
