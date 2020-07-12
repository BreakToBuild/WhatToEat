/// <reference types="Cypress" />
describe("SignUp & SignIn test", () => {
  /* it("verify request and response SignUp ", () => {
    cy.visit("/");
    cy.server();
    cy.route("POST", "signup").as("signup" 

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
  }); */

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

  it("verify request and response Login ", () => {
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

describe("Navigation test", () => {
  it("Login", () => {
    cy.loginToApplication();
  });
  it("BreadCrumb navigation", () => {
    cy.get(".breadcrumb").contains("Inicio").should("have.class", "is-active");
    cy.get(".breadcrumb").contains("Receitas").click();
    cy.get(".breadcrumb")
      .contains("Receitas")
      .should("have.class", "is-active");
    cy.get(".breadcrumb")
      .contains("Minhas receitas")
      .click()
      .should("have.class", "is-active");
  });
  it("NavBar navigation", () => {
    cy.get(".sideNav").contains("Inicio").click();
    cy.url().should("include", "/home");
    cy.get(".sideNav").contains("Todas as receitas").click();
    cy.url().should("include", "/recipes");
    cy.get(".breadcrumb")
      .contains("Receitas")
      .should("have.class", "is-active");
    cy.get(".sideNav").contains("Minhas receitas").click();
    cy.url().should("include", "/my-recipes");
    cy.get(".breadcrumb")
      .contains("Minhas receitas")
      .should("have.class", "is-active");
  });
});

describe.only("Recipe tests", () => {
  it("add recipes", () => {
    cy.loginToApplication();
    cy.url().should("include", "/home");
    cy.get(".sideNav").contains("Todas as receitas").click();
    cy.url().should("include", "/recipes");
    cy.get("table").find("tr").should("have.length", 4);
    cy.get("[data-cy=adicionar]").click();
    cy.get('[name="nome"]').type("sim Carne");
    cy.get('[name="descricao"]').type("ok");
    cy.get('[name="ingredientes"]').type("muitos");
    cy.get('[name="preparacao"]').type("meh");
    cy.get("form").submit();
    cy.get("table").find("tr").should("have.length", 5);
    cy.get("table").contains("td", "sim Carne");
  });
  it("delete recipes", () => {
    cy.loginToApplication();
    cy.url().should("include", "/home");
    cy.get(".sideNav").contains("Todas as receitas").click();
    cy.url().should("include", "/recipes");
    cy.get("table").find("tr").should("have.length", 4);
    cy.get("table").contains("Eliminar").click();
    cy.get("table").find("tr").should("have.length", 3);
  });
  it("update recipes", () => {
    cy.loginToApplication();
    cy.url().should("include", "/home");
    cy.get(".sideNav").contains("Todas as receitas").click();
    cy.url().should("include", "/recipes");
    cy.get("table").find("tr").should("have.length", 4);
    cy.get("table").contains("Editar").click();
    cy.get("[data-cy=Editar]").click();
    cy.get('[name="nome"]').type("Sardinha");
    cy.get("form").submit();
    cy.get("table")
      .contains("td", "Sardinhas na cataplanaSardinha")
      .should("exist");
  });
});
