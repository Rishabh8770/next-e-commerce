// cypress/e2e/home.cy.js
describe('E-commerce Home Page', () => {
    it('should display the correct title', () => {
      cy.visit('/'); // Visit the homepage
      cy.title().should('include', 'Create Next App'); // Check the title
    });
  });
  
  describe('User Login', () => {
    it('should log in successfully with valid credentials', () => {
      cy.visit('/login');
      
      // Use your custom login command
      cy.login('rishabh.malewar@gmail.com', 'Rish@bh8871');
  
      // Check if the user is redirected to the homepage
      cy.url().should('include', '/'); // Update with the correct path
      
    });
  });