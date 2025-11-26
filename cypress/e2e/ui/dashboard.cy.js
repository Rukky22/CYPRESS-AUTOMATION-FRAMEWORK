// Dashboard Tests with Session Storage

import DashboardPage from '../../pages/dashboardPage';
import LoginPage from '../../pages/loginPage';

describe('Dashboard Functionality', () => {
  let dashboardPage;
  let loginPage;

  before(() => {
    // Login once for entire test suite
    cy.loginWithSession('Admin', 'admin123');
  });

  beforeEach(() => {
    dashboardPage = new DashboardPage();
    loginPage = new LoginPage();

    // Visit dashboard (session already exists)
    cy.visit('/web/index.php/dashboard/index');
  });

  describe('Dashboard Display', () => {
    it('should load dashboard successfully', () => {
      dashboardPage.verifyDashboardLoaded();
    });

    it('should display user dropdown', () => {
      dashboardPage.userDropdown.should('be.visible');
    });

    it('should display quick launch icons', () => {
      dashboardPage.verifyQuickLaunchIcons();
    });

    it('should display time at work widget', () => {
      dashboardPage.timeAtWorkWidget.should('be.visible');
    });
  });

  describe('Navigation', () => {
    it('should navigate to Admin page', () => {
      dashboardPage.navigateToAdmin();
      cy.url().should('include', '/admin');
    });

    it('should navigate to PIM page', () => {
      dashboardPage.navigateToPIM();
      cy.url().should('include', '/pim');
    });
  });

  describe('Logout', () => {
    it('should logout successfully', () => {
      dashboardPage.logout();
      cy.url().should('include', '/auth/login');

      // Login again for other tests
      cy.loginWithSession('Admin', 'admin123');
    });
  });
});
