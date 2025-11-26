class EmployeesPage {
  // Locators
  get pageHeader() {
    return cy.get('.oxd-topbar-header-breadcrumb h6');
  }

  get addButton() {
    return cy.get('button').contains('Add');
  }

  get employeeListTable() {
    return cy.get('.oxd-table');
  }

  get searchInput() {
    return cy.get('input').first();
  }

  get searchButton() {
    return cy.get('button[type="submit"]');
  }

  get employeeRecords() {
    return cy.get('.oxd-table-body .oxd-table-card');
  }

  //Verify on employees page

  verifyEmployeesPageLoaded() {
    cy.log('Verifying employees page loaded');
    cy.url().should('include', '/pim');
    this.pageHeader.should('contain', 'PIM');
  }

  //Search for employee

  searchEmployee(employeeName) {
    cy.log(`Searching for employee: ${employeeName}`);
    this.searchInput.clear().type(employeeName);
    this.searchButton.click();
    cy.wait(1000); // This should be awoided as much as possible
  }

  //Verify employee in results

  verifyEmployeeInResults(employeeName) {
    this.employeeRecords.should('be.visible').and('contain', employeeName);
  }

  //Verify table has records

  verifyEmployeeListHasRecords() {
    this.employeeRecords.should('have.length.greaterThan', 0);
  }
}

export default EmployeesPage;
