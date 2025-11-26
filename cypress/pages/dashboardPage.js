class DashboardPage {
  // Locators
  get pageHeader() {
    return cy.get('.oxd-topbar-header-breadcrumb h6');
  }

  get userDropdown() {
    return cy.get('.oxd-userdropdown-tab');
  }

  get quickLaunchIcons() {
    return cy.get('.oxd-grid-3 .oxd-quickLaunch-icon');
  }

  get timeAtWorkWidget() {
    return cy.get('.orangehrm-dashboard-widget');
  }

  get logoutButton() {
    return cy.contains('a', 'Logout');
  }

  // Navigation menu items
  get adminMenu() {
    return cy.contains('span', 'Admin');
  }

  get pimMenu() {
    return cy.contains('span', 'PIM');
  }

  get leaveMenu() {
    return cy.contains('span', 'Leave');
  }

  get timeMenu() {
    return cy.contains('span', 'Time');
  }

  // Verify user is on dashboard

  verifyDashboardLoaded() {
    cy.log('Verifying dashboard loaded');
    cy.url().should('include', '/dashboard');
    this.pageHeader.should('be.visible').and('contain', 'Dashboard');
  }

  // Get username from header

  getLoggedInUsername() {
    return this.userDropdown.invoke('text');
  }

  // Navigate to Admin page

  navigateToAdmin() {
    cy.log('Navigating to Admin page');
    this.adminMenu.click();
    cy.url().should('include', '/admin');
  }

  //Navigate to PIM (Employees) page

  navigateToPIM() {
    cy.log('Navigating to PIM page');
    this.pimMenu.click();
    cy.url().should('include', '/pim');
  }

  Logout;

  logout() {
    cy.log('Logging out');
    this.userDropdown.click();
    this.logoutButton.click();
    cy.url().should('include', '/auth/login');
  }

  //Verify quick launch icons are visible

  verifyQuickLaunchIcons() {
    this.quickLaunchIcons.should('have.length.greaterThan', 0);
  }
}

export default DashboardPage;
