describe("LMS login/logout", () => {
  it("Enter e-mail#1, enter password#1, find and press logout", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.SignIn("user888@gmail.com", "1234567890");

    cy.exit();
  });

  it("Enter e-mail#2, enter password#2, find and press logout", () => {
    cy.visit("https://www.edu.goit.global/account/login");

    cy.SignIn("testowyqa@qa.team", "QA!automation-1");

    cy.exit();
  });
});
