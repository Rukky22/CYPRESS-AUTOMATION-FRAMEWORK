//API Users Tests - reqres.in

import UsersAPI from '../../support/api/UsersAPI';
import apiTestData from '../../fixtures/apiTestData.json';

describe('API - Users Management', () => {
  let usersAPI;
  let createdUserId;

  before(() => {
    usersAPI = new UsersAPI();
  });

  describe('GET - List Users', () => {
    it('should get list of users from page 1', () => {
      usersAPI.getUsers(1).then((response) => {
        usersAPI.validateUsersListResponse(response);
        expect(response.body.page).to.equal(1);
      });
    });

    it('should get list of users from page 2', () => {
      usersAPI.getUsers(2).then((response) => {
        usersAPI.validateUsersListResponse(response);
        expect(response.body.page).to.equal(2);
      });
    });

    it('should have correct pagination data', () => {
      usersAPI.getUsers(1).then((response) => {
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('per_page');
        expect(response.body).to.have.property('total');
        expect(response.body).to.have.property('total_pages');
      });
    });

    it('should return correct number of users per page', () => {
      usersAPI.getUsers(1).then((response) => {
        expect(response.body.data.length).to.equal(response.body.per_page);
      });
    });
  });

  describe('GET - Single User', () => {
    apiTestData.users.testUserIds.forEach((userId) => {
      it(`should get user with ID ${userId}`, () => {
        usersAPI.getSingleUser(userId).then((response) => {
          usersAPI.validateSingleUserResponse(response, userId);
        });
      });
    });

    it('should return 404 for non-existent user', () => {
      usersAPI.getSingleUser(9999).then((response) => {
        usersAPI.validateUserNotFound(response);
      });
    });

    it('should have correct user data structure', () => {
      usersAPI.getSingleUser(2).then((response) => {
        expect(response.body.data).to.have.all.keys('id');
      });
    });
  });
});
