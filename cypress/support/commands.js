// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.addAll({
  visitt(url) {
    cy.visit(url);
  },

  SignIn(email, pw) {
    cy.get("#user_email").type(email);
    cy.get("#user_password").type(pw);
    cy.get("[type='submit']").click();
  },

  exit() {
    cy.get("#open-navigation-menu-mobile").click();
    cy.get("nav div").contains("Log out").click();
  },
});
