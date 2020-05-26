/// <reference types="Cypress" />

describe("First test", () => {
  it("Visit webSite", () => {
    cy.visit("/");
  });

  describe("Open modal", () => {
    it("Opens the modal", () => {
      cy.contains("Login").click();
      cy.focused();
    });
  });

  describe("get and test inputfields", () => {
    it("Fill the fields", () => {
      cy.get("Form").within(() => {
        cy.get("input#formGridEmail.form-control").type("a11204@aetrofa.com");
        cy.get("input#password-field.form-control").type("jurosegredo");
        cy.get("[id^=eye]").click({ multiple: true });
      });
    });
  });
});

describe("test register Form", () => {
  it("open and fill register form", () => {
    cy.get("[id^=registerBtn").click({ multiple: true });
    cy.get("Form").within(() => {
      cy.get("input").type("zé");
    });
  });
});
