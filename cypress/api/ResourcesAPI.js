//Resources API Helper
//For reqres.in API testing

import 'dotenv/config';

class ResourcesAPI {
  constructor() {
    this.baseUrl = process.env.API_BASE_URL;
  }

  //Get list of resources

  getResources(page = 1) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/unknown`,
      qs: { page: page },
      failOnStatusCode: false,
    });
  }

  //Get single resource

  getSingleResource(resourceId) {
    return cy.request({
      method: 'GET',
      url: `${this.baseUrl}/unknown/${resourceId}`,
      failOnStatusCode: false,
    });
  }

  //Validate resources list

  validateResourcesList(response) {
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.be.an('array');

    // Validate resource structure
    response.body.data.forEach((resource) => {
      expect(resource).to.have.property('id');
      expect(resource).to.have.property('name');
      expect(resource).to.have.property('year');
      expect(resource).to.have.property('color');
      expect(resource).to.have.property('pantone_value');
    });
  }

  //Validate single resource

  validateSingleResource(response, expectedId) {
    expect(response.status).to.equal(200);
    expect(response.body.data).to.have.property('id', expectedId);
  }
}

export default ResourcesAPI;
