//Employees (PIM) Tests with Session

import EmployeesPage from '../../pages/employeesPage';
import DashboardPage from '../../pages/dashboardPage';

describe('Employees Management', () => {
  let employeesPage;
  let dashboardPage;

  before(() => {
    cy.loginWithSession('Admin', 'admin123');
  });

  beforeEach(() => {
    employeesPage = new EmployeesPage();
    dashboardPage = new DashboardPage();

    // Navigate to PIM
    cy.visit('/web/index.php/dashboard/index');
    dashboardPage.navigateToPIM();
  });

  describe('Employee List', () => {
    it('should display employee list', () => {
      employeesPage.verifyEmployeesPageLoaded();
      employeesPage.verifyEmployeeListHasRecords();
    });

    it('should have Add button visible', () => {
      employeesPage.addButton.should('be.visible');
    });
  });

  describe('Employee Search', () => {
    it('should search for employee by name', () => {
      employeesPage.searchEmployee('Peter');
      employeesPage.verifyEmployeeInResults('Peter');
    });
  });
});
