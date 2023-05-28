export class LoginPageTest {
  visitt(url) {
    cy.visit(url);
  }

  SignIn(email, pw) {
    cy.get("#user_email").type(email);
    cy.get("#user_password").type(pw);
    cy.get("[type='submit']").click();
  }
}
