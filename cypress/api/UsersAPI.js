//Users API Helper
//For reqres.in API testing

import 'dotenv/config';

class UsersAPI {
  constructor() {
    this.baseUrl = process.env.API_BASE_URL;
  }

  //Get list of users

  getUsers(page = 1) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/users`,
      qs: { page: page },
      failOnStatusCode: false,
    });
  }

  //Get single user

  getSingleUser(userId) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/users/${userId}`,
      failOnStatusCode: false,
    });
  }

  //Create user

  createUser(name, job) {
    return cy.request({
      method: 'POST',
      url: `${this.baseUrl}/users`,
      body: {
        name: name,
        job: job,
      },
      failOnStatusCode: false,
    });
  }

  //Update user (PUT)

  updateUser(userId, name, job) {
    return cy.request({
      method: 'PUT',
      url: `${this.baseUrl}/users/${userId}`,
      body: {
        name: name,
        job: job,
      },
      failOnStatusCode: false,
    });
  }

  //Patch user (PATCH)

  patchUser(userId, data) {
    return cy.request({
      method: 'PATCH',
      url: `${this.baseUrl}/users/${userId}`,
      body: data,
      failOnStatusCode: false,
    });
  }

  // Delete user

  deleteUser(userId) {
    return cy.request({
      method: 'DELETE',
      url: `${this.baseUrl}/users/${userId}`,
      failOnStatusCode: false,
    });
  }

  //Validate users list response

  validateUsersListResponse(response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('page');
    expect(response.body).to.have.property('per_page');
    expect(response.body).to.have.property('total');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.be.an('array');
    cy.log(
      `Found ${response.body.data.length} users on page ${response.body.page}`
    );
  }

  //Validate single user response

  validateSingleUserResponse(response, userId) {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.property('id', userId);
    expect(response.body.data).to.have.property('email');
    expect(response.body.data).to.have.property('first_name');
    expect(response.body.data).to.have.property('last_name');
  }

  //Validate user creation

  validateUserCreation(response, expectedName, expectedJob) {
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('name', expectedName);
    expect(response.body).to.have.property('job', expectedJob);
    expect(response.body).to.have.property('id');
    expect(response.body).to.have.property('createdAt');
    cy.log(`User created with ID: ${response.body.id}`);
  }

  // Validate user update

  validateUserUpdate(response, expectedName, expectedJob) {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('name', expectedName);
    expect(response.body).to.have.property('job', expectedJob);
    expect(response.body).to.have.property('updatedAt');
  }

  //Validate user deletion

  validateUserDeletion(response) {
    expect(response.status).to.equal(204);
    cy.log('User deleted successfully');
  }

  //Validate user not found

  validateUserNotFound(response) {
    expect(response.status).to.equal(404);
    cy.log('User not found (expected)');
  }
}

export default UsersAPI;
