//API Authentication Tests - reqres.in

import AuthAPI from '../../api/authAPI/';
import apiTestData from '../../fixtures/apiTestData.json';

describe('API - Authentication', () => {
  let authAPI;

  before(() => {
    authAPI = new AuthAPI();
  });

  describe('User Registration', () => {
    it('should register user successfully with valid credentials', () => {
      const { email, password } = apiTestData.auth.validUser;

      authAPI.register(email, password).then((response) => {
        authAPI.validateRegistrationSuccess(response);
      });
    });

    it('should fail registration with missing password', () => {
      const { email } = apiTestData.auth.missingPassword;

      authAPI.register(email, null).then((response) => {
        authAPI.validateAuthFailure(response, 'Missing password');
      });
    });

    it('should fail registration with invalid email format', () => {
      authAPI.register('invalidemail', 'password123').then((response) => {
        expect(response.status).to.equal(400);
      });
    });
  });

  describe('User Login', () => {
    it('should login successfully with valid credentials', () => {
      const { email, password } = apiTestData.auth.validUser;

      authAPI.login(email, password).then((response) => {
        authAPI.validateLoginSuccess(response);

        // Store token for future requests
        cy.wrap(response.body.token).as('authToken');
      });
    });

    it('should fail login with invalid credentials', () => {
      const { email, password } = apiTestData.auth.invalidUser;

      authAPI.login(email, password).then((response) => {
        authAPI.validateAuthFailure(response, 'user not found');
      });
    });

    it('should fail login with missing email', () => {
      authAPI.login(null, 'password').then((response) => {
        expect(response.status).to.equal(400);
      });
    });

    it('should fail login with missing password', () => {
      const { email } = apiTestData.auth.validUser;

      authAPI.login(email, null).then((response) => {
        authAPI.validateAuthFailure(response, 'Missing password');
      });
    });
  });

  describe('Token Validation', () => {
    it('should return token with correct format', () => {
      const { email, password } = apiTestData.auth.validUser;

      authAPI.login(email, password).then((response) => {
        expect(response.body.token).to.be.a('string');
        expect(response.body.token).to.have.length.greaterThan(0);
      });
    });
  });
});
