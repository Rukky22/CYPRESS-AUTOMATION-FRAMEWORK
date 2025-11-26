class AdminPage {
  // Locators
  get pageHeader() {
    return cy.get('.oxd-topbar-header-breadcrumb h6');
  }

  get userManagementDropdown() {
    return cy.contains('.oxd-topbar-body-nav-tab', 'User Management');
  }

  get usersMenuItem() {
    return cy.contains('a', 'Users');
  }

  get addButton() {
    return cy.get('button').contains('Add');
  }

  get userTable() {
    return cy.get('.oxd-table');
  }

  get searchButton() {
    return cy.get('button[type="submit"]');
  }

  //Verify on admin page

  verifyAdminPageLoaded() {
    cy.log('Verifying admin page loaded');
    cy.url().should('include', '/admin');
    this.pageHeader.should('contain', 'Admin');
  }

  //Navigate to Users

  navigateToUsers() {
    cy.log('Navigating to Users');
    this.userManagementDropdown.click();
    this.usersMenuItem.click();
  }

  //Verify user table visible

  verifyUserTableVisible() {
    this.userTable.should('be.visible');
  }
}

export default AdminPage;
