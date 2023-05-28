import { LoginPageTest } from "./pages/Login";

import { HomePageTests } from "./pages/HomePage";

const loginPage = new LoginPageTest();
const homePage = new HomePageTests();

const signData = [
  {
    login: "user888@gmail.com",
    pass: "1234567890",
  },
  {
    login: "testowyqa@qa.team",
    pass: "QA!automation-1",
  },
];

describe("LMS login/logout", () => {
  signData.forEach((data) => {
    it(`Enter ${data.login}, enter ${data.pass} & exit`, () => {
      loginPage.visitt("https://www.edu.goit.global/account/login");

      loginPage.SignIn(data.login, data.pass);

      homePage.exit();
    });
  });
});
