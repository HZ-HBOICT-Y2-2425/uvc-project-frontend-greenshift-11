  
  
  describe('Home Page', () => {
    
    beforeEach(() => {
      // Simulate a logged-in user
      cy.visit('/home'); // Adjust the route to match your home page
      localStorage.setItem('username', 'TestUser');
      localStorage.setItem('authToken', 'mockToken');
      cy.reload();
    });
  
    it('should display the garden health', () => {
      cy.contains('Garden Health').should('be.visible');
      cy.get('.h-full').should('have.css', 'width').and('not.be.empty');
    });
  
    it('should allow a user to complete a task', () => {
      cy.get('input[type="checkbox"]').first().check();
      cy.contains('Congratulations! You earned 10 coins').should('be.visible');
    });
  
    it('should manage inventory items', () => {
      cy.get('button').contains('Manage Garden Items').click();
      cy.contains('Your Garden Inventory').should('be.visible');
      // Add more actions for managing items
    });
  });
  