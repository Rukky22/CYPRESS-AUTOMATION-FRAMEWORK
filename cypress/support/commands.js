// Custom logging with timestamp
Cypress.Commands.add('logStep', (message) => {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  cy.log(`[${timestamp}] ${message}`);
});

// Wait for element to be visible
Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});

// Check if element exists without failing test
Cypress.Commands.add('elementExists', (selector) => {
  return cy.get('body').then(($body) => {
    return $body.find(selector).length > 0;
  });
});

// Custom screenshot with timestamp
Cypress.Commands.add('captureScreenshot', (name) => {
  const timestamp = Date.now();
  cy.screenshot(`${name}_${timestamp}`);
});

// SESSION STORAGE COMMANDS

//Login and save session
//This prevents logging in for every test

Cypress.Commands.add('loginWithSession', (username, password) => {
  cy.session(
    [username, password], // Unique identifier for this session
    () => {
      // This code runs only once per session
      cy.visit('/web/index.php/auth/login');
      cy.get("input[name='username']").type(username);
      cy.get("input[name='password']").type(password);
      cy.get('button[type="submit"]').click();

      // Wait for login to complete
      cy.url().should('include', '/dashboard');
      cy.get('.oxd-topbar-header-breadcrumb h6').should('contain', 'Dashboard');
    },
    {
      validate() {
        // Check if session is still valid
        cy.request({
          url: '/web/index.php/api/v2/dashboard/employees/time-at-work',
          failOnStatusCode: false,
        }).then((response) => {
          // If response is not 401, session is valid
          expect(response.status).to.not.equal(401);
        });
      },
      cacheAcrossSpecs: true, // Share session across test files
    }
  );
});

//Login once for entire test suite

Cypress.Commands.add('loginOnce', () => {
  cy.loginWithSession('Admin', 'admin123');
  cy.visit('/web/index.php/dashboard/index');
});

//Save session data to file

Cypress.Commands.add('saveSessionData', () => {
  cy.getCookies().then((cookies) => {
    cy.writeFile('cypress/sessions/sessionData.json', {
      cookies: cookies,
      timestamp: new Date().toISOString(),
    });
  });
});

//Load session data from file

Cypress.Commands.add('loadSessionData', () => {
  cy.readFile('cypress/sessions/sessionData.json').then((sessionData) => {
    sessionData.cookies.forEach((cookie) => {
      cy.setCookie(cookie.name, cookie.value);
    });
  });
});

// API TESTING COMMANDS

//API request with logging

Cypress.Commands.add('apiRequest', (method, url, body = null) => {
  const options = {
    method: method,
    url: url,
    headers: {
      'Content-Type': 'application/json',
    },
    failOnStatusCode: false,
  };

  if (body) {
    options.body = body;
  }

  cy.log(`API ${method}: ${url}`);

  return cy.request(options).then((response) => {
    cy.log(`Response Status: ${response.status}`);
    return response;
  });
});

//Validate API response structure

Cypress.Commands.add(
  'validateApiResponse',
  (response, expectedStatus, requiredFields = []) => {
    // Validate status code
    expect(response.status).to.equal(expectedStatus);

    // Validate response has body
    expect(response.body).to.exist;

    // Validate required fields exist
    requiredFields.forEach((field) => {
      expect(response.body).to.have.property(field);
    });
  }
);

//API request with authentication

Cypress.Commands.add('authenticatedApiRequest', (method, url, body = null) => {
  cy.getCookie('orangehrm').then((cookie) => {
    const options = {
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        Cookie: `orangehrm=${cookie.value}`,
      },
      failOnStatusCode: false,
    };

    if (body) {
      options.body = body;
    }

    return cy.request(options);
  });
});
