/**
 *
 * SKENARIO TESTING
 *
 * End to End: Detail Page
 *
 * - Should display the detail page correctly
 *
 * 1. When not logged in
 *    a. Like and Dislike Thread
 *       - Upvote Like should link to login when not logged in
 *       - Downvote Like should link to login when not logged in
 *
 *    b. New Comment
 *       - Should display link when not login
 *
 * 2. When logged in
 *    a. New Comment
 *       - Should show modal
 *       - Should add comment
 *
 */

describe('Detail Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/detail/thread-Np47p4jhUXYhrhRn');
  });

  it('Should display the detail page correctly', () => {
    cy.get('.text-primary').should(
      'contain.text',
      'Bagaimana pengalamanmu belajar Redux?'
    );
    cy.get('[data-testid="content-detail"]').should('be.visible');
  });

  describe('When not logged in', () => {
    describe('Like and Dislike Thread', () => {
      it('Upvote Like should link to login when not logged in', () => {
        cy.get('.card-body').within(() => {
          cy.get('a[aria-label="upvote"]').click();
          cy.url().should('eq', 'http://localhost:5173/login');
        });
      });

      it('Downvote Like should link to login when not logged in', () => {
        cy.get('.card-body').within(() => {
          cy.get('a[aria-label="downvote"]').click();
          cy.url().should('eq', 'http://localhost:5173/login');
        });
      });
    });

    describe('New Comment', () => {
      it('Should display link when not login', () => {
        cy.get('a[aria-label="add-comment"]').click();
        cy.url().should('eq', 'http://localhost:5173/login');
      });
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.visit('/login');
      const email = 'jhonDoe@gmail.com';
      const password = 'password123';

      cy.get('input[name="email"]').type(email);
      cy.get('input[name="password"]').type(password);

      cy.get('button[type="submit"]').click();

      cy.url().should('eq', 'http://localhost:5173/');
      cy.contains('Login Berhasil').should('be.visible');

      cy.get('button.btn-category:contains("#redux")').click();

      cy.get('.card-thread').first().click();
      cy.url().should(
        'eq',
        'http://localhost:5173/detail/thread-Np47p4jhUXYhrhRn'
      );

      cy.wait(2000);
    });

    describe('New Comment', () => {
      it('Should show modal', () => {
        cy.get('button[aria-label="add-comment"]').click();
        cy.get('dialog#add_comment').should('be.visible');
      });

      it('Should add comment', () => {
        cy.get('button[aria-label="add-comment"]').click();
        cy.get('dialog#add_comment').should('be.visible');

        cy.get('textarea[name="content"]').type('test comment');

        cy.get('button[type="submit"]:contains("Kirim")').click();

        cy.contains('Berhasil menambahkan komentar').should('be.visible');
        cy.get('.card-body:contains("test comment")').should('be.visible');
      });
    });
  });
});
