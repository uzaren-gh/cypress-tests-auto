const fs = require("fs");

const random = (x) => {
  return Math.floor(Math.random() * x);
};

describe("https://api.mail.gw/domains", () => {
  const request = {
    url: "https://api.mail.gw/domains",
    failOnStatusCode: false,
  };

  let domains, domain;

  const signData = [
    {
      username: "usname10",
      password: "sdfsdff",
      id: "",
      token: "",
    },
    {
      username: "usname11",
      password: "sdfsdff",
      id: "",
      token: "",
    },
    {
      username: "usname12",
      password: "sdfsdff",
      id: "",
      token: "",
    },
  ];

  // let email = "user2";
  // let password = "stringasc";
  it("GetDomains ", () => {
    cy.request(request).then((response) => {
      const status = response.status;
      assert.equal(200, status);
      console.log(response.body);

      domains = response.body["hydra:member"].map((element) => element.domain);
      console.log("domains:", domains);
    });
  });

  signData.forEach((data) => {
    it("Create the account", () => {
      domain = domains[random(domains.length)];
      domain = domains[1];
      const prequest = {
        url: "https://api.mail.gw/accounts",
        method: "POST",
        body: {
          address: `${data.username}@${domain}`,
          password: `${data.password}`,
        },
        failOnStatusCode: false,
      };

      cy.request(prequest).then((response) => {
        const status = response.status;

        console.log(response.body);
        assert.equal(201, status);
        data.id = response.body.id;
      });
    });
    // });

    it("Token acception (POST method)", () => {
      domain = domains[1];
      const request = {
        url: "https://api.mail.gw/token",
        method: "POST",
        body: {
          address: `${data.username}@${domain}`,
          password: `${data.password}`,
        },

        failOnStatusCode: false,
      };
      cy.request(request).then((response) => {
        const status = response.status;

        data.token = response.body.token;
        console.log(response.body);
        console.log(data.token);

        data.id = response.body.id;
        assert.equal(200, status);

        data.email = `${data.username}@${domain}`;

        console.log("signData:", signData);
        // fs.writeFile("./data.json", JSON.stringify(signData), "utf-8");
      });
    });
    // });

    it("GET messages", () => {
      const request = {
        url: `https://api.mail.gw/messages?page=1/`,
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        failOnStatusCode: false,
      };

      cy.request(request).then((response) => {
        const status = response.status;
        assert.equal(200, status);
        // console.log("id of letter");
        // messageId = response.body["hydra:member"][0]["@id"];
        // console.log(messageId);
        // console.log(response.body);
      });
    });

    //   it("GET message by id", () => {
    //     const request = {
    //       url: `https://api.mail.gw${messageId}`,
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       failOnStatusCode: false,
    //     };

    //     cy.request(request).then((response) => {
    //       const status = response.status;
    //       assert.equal(200, status);
    //       // console.log("id of letter");
    //       console.log(response);
    //       console.log(response.body.seen);
    //     });
    //   });

    // it("CHANGE status of message by id", () => {
    //   const request = {
    //     url: `https://api.mail.gw${messageId}`,
    //     // "@context": "/contexts/Message",
    //     // "@type": "hydra:Operation",
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: {
    //       seen: true,
    //     },
    //     failOnStatusCode: false,
    //   };

    //   cy.request(request).then((response) => {
    //     const status = response.status;
    //     assert.equal(200, status);

    //     console.log(response.status);
    //   });
    // });

    // Удаление аккаунтов
    it("Delete account", () => {
      const prequest = {
        url: `https://api.mail.gw/accounts/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        failOnStatusCode: false,
      };

      cy.request(prequest).then((response) => {
        const status = response.status;
        console.log(response);
        assert.equal(204, status);
      });
    });
  });
});
