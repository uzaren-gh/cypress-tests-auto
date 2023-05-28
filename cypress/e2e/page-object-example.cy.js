import { LoginPage } from "./pages/login";

const loginPage = new LoginPage();

describe("page obj expample", () => {
  it("Login page", () => {
    loginPage.navigateToPage();

    loginPage.validateLoginTtle();

    // vivist websote
    // cy.visit("https://www.edu.goit.global/account/login");
    // cy.get(".css-10stgr7 > .css-c1vj7d").should("be.visible");
    // cy.get(".css-10stgr7 > .css-c1vj7d").should("have.text", "Login");
    // cy.get("#user_email").should("be.visible");
    // cy.get("#user_password").should("be.visible");
    // //проверка кнопки
    // cy.contains("Log in").should("be.visible");
    // // проверка сброса пароля
    // cy.get('[href="/account/password/restore"]').should("be.visible");
    // cy.get('[href="/account/password/restore"]').should(
    //   "have.text",
    //   "I can't remember the password"
    // );
  });
});
