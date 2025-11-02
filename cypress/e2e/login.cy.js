import LoginPage from '../support/pages/LoginPage';
import testData from '../fixtures/testData.json';

describe('Login Functionality - Cypress Tests', () => {
  let loginPage;

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
  });

  describe('Successful Login Scenarios', () => {
    testData.validUsers.forEach((user) => {
      it(`${user.testCaseId}: ${user.description}`, () => {
        cy.logStep(`Testing user: ${user.username} (${user.role})`);

        loginPage.login(user.username, user.password);
        loginPage.verifySuccessfulLogin(user.expectedUrl);

        cy.logStep(`✓ Test passed for ${user.role} user`);
      });
    });
  });

  describe('Failed Login Scenarios', () => {
    testData.invalidUsers.forEach((user) => {
      it(`${user.testCaseId}: ${user.description}`, () => {
        cy.logStep(`Testing: ${user.description}`);

        loginPage.login(user.username, user.password);
        loginPage.verifyLoginFailure(user.expectedError);

        cy.logStep('✓ Error message verified correctly');
      });
    });
  });

  describe('Form Validation', () => {
    it('should display error for empty credentials', () => {
      loginPage.clickLoginButton();
      loginPage.errorMessage.should('be.visible');
    });

    it('should mask password field', () => {
      loginPage.verifyPasswordIsMasked();
    });

    it('should have all required form elements', () => {
      loginPage.verifyFormElements();
    });
  });

  describe('Security Tests', () => {
    const securityTests = testData.invalidUsers.filter(
      (user) => user.testCaseId === 'CY-TC008' || user.testCaseId === 'CY-TC009'
    );

    securityTests.forEach((test) => {
      it(`${test.testCaseId}: ${test.description}`, () => {
        cy.logStep(`Security test: ${test.description}`);

        loginPage.login(test.username, test.password);
        loginPage.verifyLoginFailure(test.expectedError);

        // Ensure still on login page (not bypassed)
        cy.url().should('include', '/login');
      });
    });
  });
});
