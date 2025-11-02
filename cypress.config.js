const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
      return config;
    },

    baseUrl: process.env.CYPRESS_BASE_URL || "https://yourapp.com",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",

    // ✅ Screenshot configuration
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true,

    // ✅ Video configuration
    videosFolder: "cypress/videos",
    video: true,
    videoCompression: 32,

    viewportWidth: 1280,
    viewportHeight: 720,

    defaultCommandTimeout:
      parseInt(process.env.CYPRESS_DEFAULT_COMMAND_TIMEOUT) || 10000,
    pageLoadTimeout: parseInt(process.env.CYPRESS_PAGE_LOAD_TIMEOUT) || 30000,
    requestTimeout: parseInt(process.env.CYPRESS_REQUEST_TIMEOUT) || 15000,
    responseTimeout: parseInt(process.env.CYPRESS_RESPONSE_TIMEOUT) || 15000,
    execTimeout: parseInt(process.env.CYPRESS_EXEC_TIMEOUT) || 60000,

    env: {
      environment: process.env.CYPRESS_ENVIRONMENT || "dev",
    },

    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports/json",
      overwrite: false,
      html: false,
      json: true,
      timestamp: "mmddyyyy_HHMMss",
    },
  },
});
