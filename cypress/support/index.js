// cypress/support/index.js

// Import custom commands from commands.js
import './command';

// Run some code before every test
beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

// Custom Cypress command for logging in
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type(password);
  cy.get('button[type=submit]').click();
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
