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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("RegisterUserApplication", () => {
  cy.visit("http://dev.localhost:3000/signup");
  cy.get("[data-cy=registar]").click();
  cy.get('[name="first_name"]').type("Joao");
  cy.get('[name="last_name"]').type("Pedro");
  cy.get('[name="email"]').type("testejoao@gmail.com");
  cy.get('[name="password"]').type("simsim");
  cy.get("form").submit();
});

Cypress.Commands.add("loginToApplication", () => {
  cy.visit("/");
  cy.server();
  cy.route("POST", "**/login").as("login");

  cy.get("[data-cy=Login]").click();
  cy.get('[name="email"]').type("cypressteste123@gmail.com");
  cy.get('[name="password"]').type("adminteste");
  cy.get("form").submit();

  cy.wait("@login");
  cy.get("@login").then((xhr) => {
    console.log(xhr);
    expect(xhr.status).to.equal(200);
  });
});
