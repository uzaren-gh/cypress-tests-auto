export class HomePageTests {
  exit() {
    cy.get("#open-navigation-menu-mobile").click();
    cy.get(
      "#__next > header > div > div > nav > div:last-child > button"
    ).click();
    // cy.get("nav div").contains("Log out").click();
  }
}
