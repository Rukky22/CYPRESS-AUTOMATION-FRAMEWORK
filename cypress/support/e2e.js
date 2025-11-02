/**
 * Cypress E2E Support File
 * Global configuration and hooks
 */

// Import commands
import "./commands";

// ✅ Global beforeEach - clears cookies/storage ONCE for all tests
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();

  // Log test start
  cy.log(`Starting: ${Cypress.currentTest.title}`);
});

// Global afterEach - screenshot on failure
afterEach(function () {
  if (this.currentTest.state === "failed") {
    const testName = this.currentTest.title.replace(/\s+/g, "_");
    cy.captureScreenshot(`failed_${testName}`);
  }
});

// Handle uncaught exceptions
Cypress.on("uncaught:exception", (err, runnable) => {
  // Ignore known harmless errors
  if (err.message.includes("ResizeObserver loop")) {
    return false;
  }
  return true;
});

// Screenshot configuration
Cypress.Screenshot.defaults({
  screenshotOnRunFailure: true,
  capture: "viewport",
  scale: false,
  disableTimersAndAnimations: true,
});
