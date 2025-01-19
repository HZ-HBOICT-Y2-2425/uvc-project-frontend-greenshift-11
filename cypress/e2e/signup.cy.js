describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('/signup'); // Adjust the route to match your signup page
    });
  
    it('should allow a user to signup', () => {
      cy.get('#username').type('TestUser');
      cy.get('#email').type('testuser@example.com');
      cy.get('#password').type('password123');
      cy.get('#confirm-password').type('password123');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/questions'); // Ensure it redirects to the correct page
    });
  
    it('should show an error if passwords do not match', () => {
      cy.get('#password').type('password123');
      cy.get('#confirm-password').type('password321');
      cy.contains('Passwords do not match.').should('be.visible');
    });
  });