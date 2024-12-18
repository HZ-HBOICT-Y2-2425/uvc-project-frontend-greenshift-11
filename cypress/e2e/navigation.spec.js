describe('Navigation Tests', () => {
  it('should navigate to the articles page', () => {
    cy.visit('/');
    cy.contains('Articles').click();
    cy.url().should('include', '/articles');
    cy.contains('Expected Content for Articles');
  });

  it('should navigate to the CO2 info page', () => {
    cy.visit('/');
    cy.contains('CO2').click();
    cy.url().should('include', '/co2');
    cy.contains('Expected Content for CO2');
  });

});