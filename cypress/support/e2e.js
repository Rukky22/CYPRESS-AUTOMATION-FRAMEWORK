// Import commands
import "./commands";

// Global before hook
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Handle uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
