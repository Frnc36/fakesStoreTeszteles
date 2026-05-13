const VEGPONT = "https://fakestoreapi.com/products";
const OLDAL = "https://fruhuszar.github.io/js_fakestore/";

function betoltTermekek() {
  cy.intercept("GET", VEGPONT).as("getProducts");
  cy.visit(OLDAL);
  cy.get("#termekek").click();
}

describe("FakesStore", () => {
  it("Létezik-e az oldal?", () => {
    cy.visit(OLDAL);
  });

  beforeEach(() => {
    betoltTermekek();
  });

  it("hálózati válasz", () => {
    /* cy.intercept("GET", VEGPONT).as("getProducts");
    cy.visit(OLDAL);
    cy.get("#termekek").click(); */
    cy.wait("@getProducts").its("response.statusCode").should("eq", 200);
  });

  it("megjeleníti a termékeket", () => {
    /* beforeEach */
    cy.get(".card").should("have.length.greaterThan", 0);
  });

  it("Status kód 200", () => {
    //bodyba, a VEGPONT-ról adatok legyenek(MOK teszt)
    cy.visit(OLDAL);
    cy.intercept("GET", VEGPONT, {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: "Teszt termék",
          price: 999,
        },
      ],
    }).as("getProducts");
  });
});

describe("Hibakezelés", () => {
  it("500-as hibaüzenet", () => {
    cy.intercept("GET", VEGPONT, {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("getProductsError");
    cy.visit(OLDAL);
    cy.get("#termekek").click();
    cy.wait("@getProductsError");
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Hiba történt a termékek lekérése során.");
  });

  it("400-as hibaüzenet", () => {
    cy.intercept("GET", VEGPONT, {
      statusCode: 400,
      body: { error: "Internal Server Error" },
    }).as("getProductsError");
    cy.visit(OLDAL);
    cy.get("#termekek").click();
    cy.wait("@getProductsError");
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "Hiba történt a termékek lekérése során.");
  });
});
