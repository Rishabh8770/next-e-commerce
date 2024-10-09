// cypress.config.js
module.exports = {
    e2e: {
      baseUrl: 'http://localhost:3000', // Adjust to your Next.js dev URL
      supportFile: 'cypress/support/index.js',
      fixturesFolder: 'cypress/fixtures',
      specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    },
  };
  