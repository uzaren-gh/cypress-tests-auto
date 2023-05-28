describe("GET for https://nameday.abalin.net/api/v1/today", () => {
  it(`Get, is status code 200`, () => {
    let request = {
      method: "POST",
      url: `https://nameday.abalin.net/api/v1/today`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      failOnStatusCode: false,
    };
    cy.request(request).then((response) => {
      assert.equal(200, response.status);
      console.log(response);
    });
  });
});
