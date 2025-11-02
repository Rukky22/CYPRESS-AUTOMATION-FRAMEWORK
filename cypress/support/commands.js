// cypress/support/commands.js

// ✅ GOOD: Utility command for waiting
Cypress.Commands.add("waitForElement", (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should("be.visible");
});

// ✅ GOOD: Custom logging
Cypress.Commands.add("logStep", (message) => {
  const timestamp = new Date().toISOString();
  cy.log(`[${timestamp}] ${message}`);
});

// ✅ GOOD: Check element existence without failing
Cypress.Commands.add("elementExists", (selector) => {
  return cy.get("body").then(($body) => {
    return $body.find(selector).length > 0;
  });
});

// ✅ GOOD: Custom screenshot with naming
Cypress.Commands.add("captureScreenshot", (name) => {
  const timestamp = Date.now();
  cy.screenshot(`${name}-${timestamp}`);
});

// ✅ GOOD: Test data helper
Cypress.Commands.add("getTestData", (testCaseId) => {
  return cy.fixture("testData").then((data) => {
    const testCase = [...data.validUsers, ...data.invalidUsers].find(
      (tc) => tc.testCaseId === testCaseId
    );
    return testCase;
  });
});
