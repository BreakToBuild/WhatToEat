<reference types="Cypress" />;
describe("SignUp & SignIn test", () => {
  it("verify request and response SignUp ", () => {
    cy.visit("/");
    cy.server();
    cy.route("POST", "**/signup").as("signup");

    cy.get("[data-cy=registar]").click();
    cy.get('[name="first_name"]').type("Eusébio");
    cy.get('[name="last_name"]').type("Silva");
    cy.get('[name="email"]').type("tuzebioSilva@gmail.com");
    cy.get('[name="password"]').type("adminteste");
    cy.get("form").submit();

    cy.wait("@signup");
    cy.get("@signup").then((xhr) => {
      console.log(xhr);
      expect(xhr.status).to.equal(201);
    });
  });

  it.only("verify request and response Login ", () => {
    cy.visit("/");
    cy.server();
    cy.route("POST", "**/login").as("login");

    cy.get("[data-cy=Login]").click();
    cy.get('[name="email"]').type("tuzebioSilva@gmail.com");
    cy.get('[name="password"]').type("adminteste");
    cy.get("form").submit();

    cy.wait("@login");
    cy.get("@login").then((xhr) => {
      console.log(xhr);
      expect(xhr.status).to.equal(200);
    });
  });
});
