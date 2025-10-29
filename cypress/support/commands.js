// Custom command for login
Cypress.Commands.add("login", (username, password) => {
  cy.get("#username").clear().type(username);
  cy.get("#password").clear().type(password);
  cy.get("#loginButton").click();
});
