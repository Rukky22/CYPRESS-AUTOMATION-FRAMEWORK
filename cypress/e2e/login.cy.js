import LoginPage from '../pages/loginPage';
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

        //Handle empty field test differently
        if (
          user.errorType == 'empty_username' ||
          user.errorType == 'empty_password'
        ) {
          loginPage.login(user.username, user.password);
          loginPage.verifyEmptyFieldError(user.expectedError);
          cy.logStep('✓ Empty field error message verified correctly');
          return;
        } else {
          //Handle other invalid login accordingly
          loginPage.login(user.username, user.password);
          loginPage.verifyLoginFailure(user.expectedError);

          cy.logStep('✓ Error message verified correctly');
        }
      });
    });
  });

  describe('Form Validation', () => {
    it('should display error message for empty username field', () => {
      loginPage.enterPassword('admin123');
      loginPage.clickLoginButton();
      loginPage.verifyEmptyFieldError('Required');
    });

    it('Should display error message for empty password field', () => {
      loginPage.enterUsername('Admin');
      loginPage.clickLoginButton();
      loginPage.verifyEmptyFieldError('Required');
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
      (user) => user.securityTest === true
    );

    securityTests.forEach((test) => {
      it(`${test.testCaseId}: ${test.description}`, () => {
        cy.logStep(`Security test: ${test.description}`);

        loginPage.login(test.username, test.password);
        loginPage.verifyLoginFailure(test.expectedError);

        // Ensure still on login page (not bypassed)
        cy.url().should('include', '/auth/login');
      });
    });
  });
});
