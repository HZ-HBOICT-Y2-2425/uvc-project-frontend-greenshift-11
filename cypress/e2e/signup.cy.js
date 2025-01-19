describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('/signup'); // Adjust the route to match your signup page
    });
  
    it('should allow a user to signup', () => {
        cy.get('#username').type('James', { force: true });
        cy.get('#email').type('jamesthenewone@gmail.com', { force: true });
        cy.get('#password').type('password', { force: true });
        cy.get('#confirm-password').type('password', { force: true });
        cy.get('button[type="submit"]').should('not.be.disabled').click();
      
        // cy.url().should('include', '/questions'); // Ensure it redirects to the correct page
      });
  });