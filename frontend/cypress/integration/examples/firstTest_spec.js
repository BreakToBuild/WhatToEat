/// <reference types="Cypress" />
describe("SignUp & SignIn test", () => {
  it("verify request and response SignUp ", () => {
    cy.visit("/");
    cy.server();
    cy.route("POST", "**/signup").as("signup");

    cy.get("[data-cy=registar]").click();
    cy.get('[name="first_name"]').type("cypressteste123");
    cy.get('[name="last_name"]').type("Silva");
    cy.get('[name="email"]').type("cypressteste123@gmail.com");
    cy.get('[name="password"]').type("adminteste");
    cy.get("form").submit();

    cy.wait("@signup");
    cy.get("@signup").then((xhr) => {
      console.log(xhr);
      expect(xhr.status).to.equal(200);
    });
  });

  it("verify request and response error at SignUp  ", () => {
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

    cy.get(".error-message")
      .contains("Ocorreu um erro, tente novamente")
      .should("exist");
    cy.get("@signup").then((xhr) => {
      expect(xhr.status).to.equal(400);
      console.log(xhr);
    });
  });

  it.only("verify request and response Login ", () => {
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

  it("verify request and response error at login ", () => {
    cy.visit("/");
    cy.server();
    cy.route("POST", "**/login").as("login");

    cy.get("[data-cy=Login]").click();
    cy.get('[name="email"]').type("DeusebioSilva@gmail.com");
    cy.get('[name="password"]').type("adminteste");
    cy.get("form").submit();
    cy.wait("@login");

    cy.get(".error-message")
      .contains("Ocorreu um erro, tente novamente")
      .should("exist");
    cy.get("@login").then((xhr) => {
      expect(xhr.status).to.equal(401);

      console.log(xhr);
    });
  });
});
