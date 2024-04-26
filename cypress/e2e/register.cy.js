/**
 *
 * SKENARIO TESTING
 *
 * End to End: Register Page
 *
 * - Should display the register page correctly
 * - Should display alert when name is empty
 * - Should display alert when email is empty
 * - Should display alert when password is empty
 * - Should display alert when retype password is empty
 * - Should display warning message when password does not match
 * - Should display error message on invalid register when email is already registered
 *
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/register');
  });

  it('Should display the register page correctly', () => {
    cy.get('h2').contains('Register').should('be.visible');
    cy.get('h2').contains('Dicoding Forum').should('be.visible');
    cy.get('input[name="nama"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="retypePassword"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Register').should('be.visible');
    cy.get('p').contains('Kamu sudah punya akun?').should('be.visible');
  });

  it('Should display alert when name is empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.alert-error').should('be.visible');
    cy.get('.alert-error')
      .contains('"name" is not allowed to be empty')
      .should('be.visible');
  });

  it('Should display alert when email is empty', () => {
    cy.get('input[name="nama"]').type('John Doe');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-error').should('be.visible');
    cy.get('.alert-error')
      .contains('"email" is not allowed to be empty')
      .should('be.visible');
  });

  it('Should display alert when password is empty', () => {
    cy.get('input[name="nama"]').type('Jhon Doe');
    cy.get('input[name="email"]').type('jhonDoe@example.com');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-error').should('be.visible');
    cy.get('.alert-error')
      .contains('"password" is not allowed to be empty')
      .should('be.visible');
  });

  it('Should display alert when retype password is empty', () => {
    cy.get('input[name="nama"]').type('Jhon Doe');
    cy.get('input[name="email"]').type('jhonDoe@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-warning').should('be.visible');
    cy.get('.alert-warning')
      .contains('Password harus sama.')
      .should('be.visible');
  });

  it('Should display warning message when password does not match', () => {
    cy.get('input[name="nama"]').type('Jhon Doe');
    cy.get('input[name="email"]').type('jhonDoe@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="retypePassword"]').type('password321');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-warning').should('be.visible');
    cy.get('.alert-warning')
      .contains('Password harus sama.')
      .should('be.visible');
  });

  it('Should display error message on invalid register when email is already registered', () => {
    cy.get('input[name="nama"]').type('Jhon Doe');
    cy.get('input[name="email"]').type('jhonDoe@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="retypePassword"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-error').should('be.visible');
    cy.get('.alert-error')
      .contains('email is already taken')
      .should('be.visible');
  });
});
