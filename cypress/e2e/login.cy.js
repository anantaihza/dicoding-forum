describe('Login spec', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit('/login');
  });

  it('Should display the login page correctly', () => {
    cy.get('h2').contains('Login').should('be.visible');
    cy.get('h2').contains('Dicoding Forum').should('be.visible');
    cy.get('img').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').contains('Masuk').should('be.visible');
    cy.get('p').contains('Belum memiliki akun?').should('be.visible');
  });

  it('Should display alert when email is empty', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.alert-error').should('be.visible');
    cy.get('.alert-error')
      .contains('"email" is not allowed to be empty')
      .should('be.visible');
  });

  it('Should display alert when password is empty', () => {
    cy.get('input[name="email"]').type('jhonDoe@example.com');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-error').should('be.visible');
    cy.get('.alert-error')
      .contains('"password" is not allowed to be empty')
      .should('be.visible');
  });

  it('Should display error message on invalid login', () => {
    cy.get('input[name="email"]').type('jhonDoe@3x4mpl3.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.get('.alert-error').should('be.visible');
    cy.get('.alert-error')
      .contains('email or password is wrong')
      .should('be.visible');
  });

  it('Should login successfully with valid credentials', () => {
    const email = 'jhonDoe@gmail.com';
    const password = 'password123';

    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    cy.get('button[type="submit"]').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.contains('Login Berhasil').should('be.visible');
  });
});
