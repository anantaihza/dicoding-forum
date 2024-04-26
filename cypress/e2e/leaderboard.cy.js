/**
 *
 * SKENARIO TESTING
 *
 * End to End: Leaderboard Page
 *
 * - Should display the leaderboard page correctly
 * - Should display correct stats values
 *
 */

describe('Leaderboard spec', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/leaderboard');
  });

  it('Should display the leaderboard page correctly', () => {
    cy.get('h2').contains('Klansemen Pengguna Aktif').should('be.visible');
    cy.get('.stats').should('have.length', 3);
    cy.get('table').should('be.visible');
  });

  it('Should display correct stats values', () => {
    cy.get('.stats').eq(0).contains('Total Score').should('be.visible');
    cy.get('.stats').eq(1).contains('Score Tertinggi').should('be.visible');
    cy.get('.stats').eq(2).contains('Total User').should('be.visible');
  });
});
