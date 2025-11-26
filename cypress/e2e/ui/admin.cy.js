//Admin Page Tests with Session

import AdminPage from '../../pages/adminPage';
import DashboardPage from '../../pages/dashboardPage';

describe('Admin Functionality', () => {
  let adminPage;
  let dashboardPage;

  before(() => {
    cy.loginWithSession('Admin', 'admin123');
  });

  beforeEach(() => {
    adminPage = new AdminPage();
    dashboardPage = new DashboardPage();

    // Navigate to Admin
    cy.visit('/web/index.php/dashboard/index');
    dashboardPage.navigateToAdmin();
  });

  describe('Admin Page Display', () => {
    it('should load admin page successfully', () => {
      adminPage.verifyAdminPageLoaded();
    });

    it('should display user management dropdown', () => {
      adminPage.userManagementDropdown.should('be.visible');
    });

    it('should navigate to users list', () => {
      adminPage.navigateToUsers();
      adminPage.verifyUserTableVisible();
    });
  });
});
