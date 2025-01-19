describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login'); // Adjust the route to match your login page
    });
  
    it('should allow a user to login', () => {
      cy.get('#username').type('John');
      cy.get('#password').type('password');
      cy.get('button[type="submit"]').click();
  
      cy.url().should('include', '/home'); // Ensure it redirects to the home page
    });
  
    it('should show an error if credentials are invalid', () => {
      cy.get('#username').type('WrongUser');
      cy.get('#password').type('wrongpassword');
      cy.get('button[type="submit"]').click();
  
      cy.contains('User does not exist').should('be.visible');
    });
  });