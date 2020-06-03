/// <reference types="Cypress" />

it("verify request and response SignUp ", () => {
  cy.visit("http://dev.localhost:3000/signup");
  cy.server();
  cy.route("POST", "**/signup").as("signup");

  cy.get("[data-cy=registar]").click();
  cy.get('[name="first_name"]').type("");
  cy.get('[name="last_name"]').type("Pedro");
  cy.get('[name="email"]').type("testedostestes@gmail.com");
  cy.get('[name="password"]').type("simsim");
  cy.get("form").submit();

  cy.wait("@signup");
  cy.get("@signup").then((xhr) => {
    console.log(xhr);
    expect(xhr.status).to.equal(201);
  });
});

it("verify request and response Login ", () => {
  cy.visit("http://dev.localhost:3000/login");
  cy.server();
  cy.route("POST", "**/login").as("login");

  cy.get("[data-cy=Login]").click();
  cy.get('[name="email"]').type("testedostestes@gmail.com");
  cy.get('[name="password"]').type("simsim");
  cy.get("form").submit();

  cy.wait("@login");
  cy.get("@login").then((xhr) => {
    console.log(xhr);
    expect(xhr.status).to.equal(200);
  });
});
