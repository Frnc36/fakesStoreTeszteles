const VEGPONT = "https://fakestoreapi.com/products";
const OLDAL = "https://fruhuszar.github.io/js_fakestore/";

describe("FakesStore", () => {
  it("Létezik-e az oldal?", () => {
    cy.visit("https://fruhuszar.github.io/js_fakestore/");
  });
});
