// Authentication API Helper
//For reqres.in API testing

import 'dotenv/config';

class AuthAPI {
  constructor() {
    this.baseUrl = process.env.API_BASE_URL;
  }

  //Register user

  register(email, password) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/register`,
      body: {
        email: email,
        password: password,
      },
      failOnStatusCode: false,
    });
  }

  //Login user

  login(email, password) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/login`,
      body: {
        email: email,
        password: password,
      },
      failOnStatusCode: false,
    });
  }

  /**
   * Validate registration response
   */
  validateRegistrationSuccess(response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('token');
    cy.log(`Registration successful. Token: ${response.body.token}`);
  }

  /**
   * Validate login response
   */
  validateLoginSuccess(response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
    cy.log(`Login successful. Token: ${response.body.token}`);
  }

  /**
   * Validate authentication failure
   */
  validateAuthFailure(response, expectedError) {
    expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.contain(expectedError);
  }
}

export default AuthAPI;
