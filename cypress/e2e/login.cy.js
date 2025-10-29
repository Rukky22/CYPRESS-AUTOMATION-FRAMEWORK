import LoginPage from "../pages/loginPage";

describe("Login Functionality - Cypress Tests", () => {
  let testData;
  let loginPage;

  before(() => {
    cy.fixture("testData").then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  describe("Successful Login Scenarios", () => {
    // Data-driven test using forEach
    testData?.validUsers?.forEach((user) => {
      it(`${user.testCaseId}: ${user.description}`, () => {
        cy.log(`Testing with username: ${user.username}`);
        cy.log(`Role: ${user.role}`);

        loginPage.login(user.username, user.password);
        loginPage.verifySuccessfulLogin();

        cy.log(`Test passed for ${user.role} user`);
      });
    });
  });

  describe("Failed Login Scenarios", () => {
    // Data-driven test using forEach
    testData?.invalidUsers?.forEach((user) => {
      it(`${user.testCaseId}: ${user.description}`, () => {
        cy.log(`Testing: ${user.description}`);

        loginPage.login(user.username, user.password);
        loginPage.verifyLoginFailure(user.expectedError);

        cy.log(`Error message verified correctly`);
      });
    });
  });

  describe("Additional Validation", () => {
    it("should display error for empty credentials", () => {
      loginPage.clickLoginButton();
      cy.get("#errorMessage").should("be.visible");
    });

    it("should have password field masked", () => {
      cy.get("#password").should("have.attr", "type", "password");
    });
  });
});
