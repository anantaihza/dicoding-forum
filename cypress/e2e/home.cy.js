/**
 *
 * SKENARIO TESTING
 *
 * End to End: Home Page
 *
 * - Should display the home page correctly
 * - Should navigate to thread detail page when a card thread is clicked
 *
 * 1. Filter Category
 *    a. Should filter threads when display on desktop
 *    b. Should filter threads when display on mobile
 *
 * 2. When not logged in
 *    a. New Discussion
 *       - Should display link when not login
 *
 *    b. Like and Dislike
 *       - Like should link to login when not logged in
 *       - Dislike should link to login when not logged in
 *
 * 3. When logged in
 *    a. New Discussion
 *       - Should display button when login
 *       - Should create new discussion
 *
 *    b. Like and Dislike
 *       - Should like and like neutralize a thread when logged in
 *       - Should dislike and dislike neutralize a thread when logged in
 *
 */

describe('Home spec', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/');
  });

  it('Should display the home page correctly', () => {
    cy.get('.navbar').should('be.visible');

    cy.get('h2').contains('Diskusi Tersedia').should('be.visible');
    cy.get('.list-threads').should('be.visible');

    cy.viewport(1024, 858);
    cy.get('select').should('be.visible');
  });

  it('Should navigate to thread detail page when a card thread is clicked', () => {
    cy.visit('/');
    cy.get('.card-thread').first().click();
    cy.url().should('include', '/detail/');
  });

  describe('Filter Category', () => {
    it('Should filter threads when display on desktop', () => {
      cy.get('button.btn-category:contains("#perkenalan")').click();

      cy.get('.list-threads')
        .find('.card')
        .each(($el) => {
          cy.wrap($el).should('contain.text', '#perkenalan');
        });
    });

    it('Should filter threads when display on mobile', () => {
      cy.viewport(1024, 858);
      cy.get('select').select('perkenalan');

      cy.get('.list-threads')
        .find('.card')
        .each(($el) => {
          cy.wrap($el).should('contain.text', '#perkenalan');
        });
    });
  });

  describe('When not logged in', () => {
    describe('New Discussion', () => {
      it('Should display link when not login', () => {
        cy.get('a').contains('Buat Diskusi').should('be.visible');

        cy.get('a:contains("Buat Diskusi")').click();
        cy.url().should('eq', 'http://localhost:5173/login');
      });
    });

    describe('Like and Dislike', () => {
      it('Like should link to login when not logged in', () => {
        cy.get('.card-thread')
          .first()
          .within(() => {
            cy.get('a[aria-label="upvote"]').click();
            cy.url().should('eq', 'http://localhost:5173/login');
          });
      });

      it('Dislike should link to login when not logged in', () => {
        cy.get('.card-thread')
          .first()
          .within(() => {
            cy.get('a[aria-label="downvote"]').click();
            cy.url().should('eq', 'http://localhost:5173/login');
          });
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
    });

    describe('New Discussion', () => {
      it('Should display button when login', () => {
        cy.get('button').contains('Buat Diskusi').should('be.visible');
        cy.get('button:contains("Buat Diskusi")').click();

        cy.get('dialog').should('be.visible');
      });

      it('Should create new discussion', () => {
        cy.get('button').contains('Buat Diskusi').should('be.visible');
        cy.get('button:contains("Buat Diskusi")').click();

        cy.get('dialog').should('be.visible');

        const title = 'Top Secret NASA';
        const category = 'Document';
        const body = 'Lorem ipsum dolor sit amet';

        cy.get('input[name="title"]').type(title);
        cy.get('input[name="category"]').type(category);
        cy.get('textarea[name="body"]').type(body);

        cy.get('button[type="submit"]:contains("Buat")').click();

        cy.contains('Berhasil membuat diskusi baru').should('be.visible');
        cy.get('.card:contains("Top Secret NASA")').should('be.visible');
      });
    });

    describe('Like and Dislike', () => {
      it('Should like and like neutralize a thread when logged in', () => {
        cy.get('button.btn-category:contains("#perkenalan")').click();

        cy.get('.list-threads')
          .find('.card')
          .each(($el) => {
            cy.wrap($el).should('contain.text', '#perkenalan');
          });

        cy.get('.card-thread')
          .first()
          .within(() => {
            cy.get('button[aria-label="upvote"]').click();
            cy.get('svg[data-testid="upvote-icon"]').should(
              'have.class',
              'text-red-500'
            );
          });

        cy.wait(1000);

        cy.get('.card-thread')
          .first()
          .within(() => {
            cy.get('button[aria-label="upvote"]').click();
            cy.get('svg[data-testid="upvote-icon"]').should(
              'not.have.class',
              'text-red-500'
            );
          });
      });

      it('Should dislike and dislike neutralize a thread when logged in', () => {
        cy.get('button.btn-category:contains("#perkenalan")').click();

        cy.get('.list-threads')
          .find('.card')
          .each(($el) => {
            cy.wrap($el).should('contain.text', '#perkenalan');
          });

        cy.get('.card-thread')
          .first()
          .within(() => {
            cy.get('button[aria-label="downvote"]').click();
            cy.get('svg[data-testid="downvote-icon"]').should(
              'have.class',
              'text-red-500'
            );
          });

        cy.wait(1000);

        cy.get('.card-thread')
          .first()
          .within(() => {
            cy.get('button[aria-label="downvote"]').click();
            cy.get('svg[data-testid="downvote-icon"]').should(
              'not.have.class',
              'text-red-500'
            );
          });
      });
    });
  });
});
