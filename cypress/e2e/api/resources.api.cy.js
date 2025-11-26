//API Resources Tests - reqres.in

import ResourcesAPI from '../../support/api/ResourcesAPI';
import apiTestData from '../../fixtures/apiTestData.json';

describe('API - Resources Management', () => {
  let resourcesAPI;

  before(() => {
    resourcesAPI = new ResourcesAPI();
  });

  describe('GET - List Resources', () => {
    it('should get list of resources', () => {
      resourcesAPI.getResources(1).then((response) => {
        resourcesAPI.validateResourcesList(response);
      });
    });

    it('should have pagination data', () => {
      resourcesAPI.getResources(1).then((response) => {
        expect(response.body).to.have.property('page');
        expect(response.body).to.have.property('per_page');
        expect(response.body).to.have.property('total');
      });
    });
  });

  describe('GET - Single Resource', () => {
    apiTestData.resources.testResourceIds.forEach((resourceId) => {
      it(`should get resource with ID ${resourceId}`, () => {
        resourcesAPI.getSingleResource(resourceId).then((response) => {
          resourcesAPI.validateSingleResource(response, resourceId);
        });
      });
    });

    it('should return 404 for non-existent resource', () => {
      resourcesAPI.getSingleResource(9999).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  });

  describe('Resource Data Validation', () => {
    it('should have correct color format', () => {
      resourcesAPI.getSingleResource(1).then((response) => {
        const color = response.body.data.color;
        expect(color).to.match(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it('should have valid year', () => {
      resourcesAPI.getSingleResource(1).then((response) => {
        const year = response.body.data.year;
        expect(year).to.be.a('number');
        expect(year).to.be.greaterThan(1999);
      });
    });
  });
});
