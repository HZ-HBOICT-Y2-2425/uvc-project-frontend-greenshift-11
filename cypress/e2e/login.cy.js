describe('Login Page', () => {
    beforeEach(() => {
      // Visit the login page before each test
      cy.visit('/login');
    });
  
    it('should allow a user to login', () => {
      // Fill out the login form
      cy.get('#username').type('John');
      cy.get('#password').type('password');
      
      // Mock the login request
      cy.intercept('POST', '**/auth/login', {
        statusCode: 200,
        body: { accessToken: 'dummyToken', username: 'John' },
      }).as('loginRequest');
  
      // Click the login button
      cy.get('button[type="submit"]').click();
  
      // Wait for the login request to complete
      cy.wait('@loginRequest');
  
      // Check if the user is redirected to the home page
      cy.url().should('include', '/home');
    });
  
    it('should show an error if credentials are invalid', () => {
      // Fill out the form with invalid credentials
      cy.get('#username').type('WrongUser');
      cy.get('#password').type('wrongpassword');
  
      // Mock the failed login request
      cy.intercept('POST', '**/auth/login', {
        statusCode: 401,
        body: { message: 'User does not exist' },
      }).as('loginRequest');
  
      // Click the login button
      cy.get('button[type="submit"]').click();
  
      // Wait for the login request
      cy.wait('@loginRequest');
  
      // Verify the error message is displayed
      cy.contains('User does not exist').should('be.visible');
    });
  });
  