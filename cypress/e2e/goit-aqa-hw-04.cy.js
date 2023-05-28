// Візьміть будь-яке публічне API з вказаного списку -
// https://github.com/public-apis/public-apis

// Напишіть серію тестів для цього API. Має бути мінімум 10 автоматизованих тестів,
//  де мають бути покриті наступні аспекти:

// +1. використання різних HTTP методів (GET/POST/etc)
// +2. відправка та перевірка заголовків (headers), як стандартних (User-Agent),
// так і кастомних
// +3. відправка query параметрів, в тому числі рандомізованих
// +4. перевірка тіла відповіді
// +5. перевірка тривалості виконання запиту

const random = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

describe('"Happy Path" on dummyjson.com', () => {
  const methods = ["POST", "GET", "PATCH", "PUT", "DELETE"];
  let qs = "add";
  //запросы с разными методами - 5 тестов
  methods.forEach((meth) => {
    it(`response code should be 200 for ${meth}-method`, () => {
      let request = {
        method: meth,
        url: `https://dummyjson.com/products/${qs}`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "Proba Pera",
        }),
        failOnStatusCode: false,
      };
      cy.request(request).then((response) => {
        // const status = response.status;
        qs = 1;
        assert.equal(200, response.status);
      });
    });
  });
});

// тестируем API транспортных средств (ТС) Бразилии :-)

describe("HAPPY PATHES for https://parallelum.com.br/fipe/api/v1/carros/marcas", () => {
  // массив с тремя различными типами ТС из таблицы FIPE
  const vehicles = {
    types: ["carros", "motos", "caminhoes"],
  };
  //три теста на получение массива марок ТС для каждого из типов
  vehicles.types.forEach((vehicleType) => {
    it(`Get of marks ${vehicleType}, is status code 200`, () => {
      let request = {
        method: "GET",
        url: `https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas`,
        headers: { "Content-Type": "application/json" },
        failOnStatusCode: false,
      };
      cy.request(request).then((response) => {
        assert.equal(200, response.status);
      });
    });
  });
  //тест по случайной модели из списка легковых авто:
  it(`Get models of random ${vehicles.types[0]} marks, are year and model arrays `, () => {
    let codes = [];
    //для независимости тестов получаем список ТС по маркам легковушек:
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v1/${vehicles.types[0]}/marcas/`,
      headers: { "Content-Type": "application/json" },
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      //получим массив номеров:
      codes = response.body.map((elem) => elem.codigo);
      //получаем код и марку со случайным номером:
      let randV = random(1, codes.length);
      //код ТС:
      const randomCode = codes[randV];
      //теперь делаем запрос по модели с полученным случайным номером
      request.url = `https://parallelum.com.br/fipe/api/v1/${vehicles.types[0]}/marcas/${randomCode}/modelos`;
      cy.request(request).then((response) => {
        assert.equal(200, response.status);
        //проверяем, являются ли год и модель в ответе массивами:
        assert.isTrue(
          Array.isArray(response.body.anos) &&
            Array.isArray(response.body.modelos)
        );
      });
    });
  });

  //тест по случайной модели из списка мотоциклов:
  it(`Get models of random ${vehicles.types[1]} marks, are year and model arrays `, () => {
    let codes = [];
    //для независимости тестов получаем список ТС по маркам мотоциклов:
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v1/${vehicles.types[1]}/marcas/`,
      headers: { "Content-Type": "application/json" },
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      //получим массив номеров:
      codes = response.body.map((elem) => elem.codigo);
      //получаем код марки со случайным номером:
      let randV = random(1, codes.length);
      //код ТС:
      const randomCode = codes[randV];
      //теперь делаем запрос по модели с полученным случайным номером
      request.url = `https://parallelum.com.br/fipe/api/v1/${vehicles.types[1]}/marcas/${randomCode}/modelos`;
      cy.request(request).then((response) => {
        assert.equal(200, response.status);

        //проверяем, являются ли год и модель в ответе массивами:
        assert.isTrue(
          Array.isArray(response.body.anos) &&
            Array.isArray(response.body.modelos)
        );
      });
    });
  });

  //тест по 10 случайным моделям из списка грузовиков:
  it(`Get models of 10 random ${vehicles.types[2]} marks, are year and model the arrays `, () => {
    let codes = [];
    //для независимости тестов получаем список ТС по маркам грузовиков:
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v1/${vehicles.types[2]}/marcas/`,
      headers: { "Content-Type": "application/json" },
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      //строим получим массив кодов:
      codes = response.body.map((elem) => elem.codigo);
      //получаем код марки со случайным номером:

      let randV = random(1, codes.length);

      //делаем 10 рандомных запросов:
      for (let index = 1; index <= 10; index++) {
        let randomCode = codes[randV];
        randV = random(1, codes.length);
        //теперь делаем запрос по модели с полученным случайным номером
        request.url = `https://parallelum.com.br/fipe/api/v1/${vehicles.types[2]}/marcas/${randomCode}/modelos`;
        cy.request(request).then((response) => {
          assert.equal(200, response.status);

          //проверяем, являются ли год и модель в ответе массивами:
          assert.isTrue(
            Array.isArray(response.body.anos) &&
              Array.isArray(response.body.modelos)
          );
        });
      }
    });
  });
});

//тесты на проверку заголовков для parallelum.com.br
describe("HEADERs Test for https://parallelum.com.br/fipe/api/v2/cars/brands/48/years", () => {
  it(`Custom header test for parallelum.com.br`, () => {
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v2/cars/brands/48/years`,
      headers: {
        "Content-Type": "application/json",
        testHeader1: "testValue1",
        testHeader2: "testValue2",
      },
      failOnStatusCode: false,
    };
    cy.request(request).then((response) => {
      assert.equal("testValue1", response.requestHeaders.testHeader1);
      assert.equal("testValue2", response.requestHeaders.testHeader2);
      assert.equal(200, response.status);
    });
  });

  // it(`Standart header test for parallelum.com.br`, () => {
  //   let useragent =
  //     "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36";
  //   let request = {
  //     method: "GET",
  //     url: `https://parallelum.com.br/fipe/api/v2/cars/brands/48/years`,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     failOnStatusCode: false,
  //   };
  //   cy.request(request).then((response) => {
  //     assert.equal(useragent, response.requestHeaders["user-agent"]);
  //     assert.equal(200, response.status);
  //   });
  // });

  //проверка длительности выполнения запроса
  it("Duration < 400 ms request test for parallelum.com.br", () => {
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v2/cars/brands/48/years`,
      failOnStatusCode: false,
    };
    cy.request(request).then((response) => {
      assert.isTrue(response.duration <= 400);
    });
  });
});

//тесты с негативными сценариями  parallelum.com.br
describe("Wrong-data tests for https://parallelum.com.br/fipe/api/v2/cars/brands/48/years", () => {
  //проверка кода ошибки при неверном методе запроса
  it(`Wrong method (POST) for parallelum.com.br body should be 405`, () => {
    let request = {
      method: "POST",
      url: `https://parallelum.com.br/fipe/api/v2/cars/brands/48/years`,
      failOnStatusCode: false,
    };

    cy.request(request).then((response) => {
      assert.equal(405, response.status);
    });
  });

  //проверка тела ответа при неверном методе запроса
  it(`Wrong method (PATCH) for parallelum.com.br body should be "Method Not Allowed"`, () => {
    let request = {
      method: "PATCH",
      url: `https://parallelum.com.br/fipe/api/v2/cars/brands/48/years`,
      body: {
        code: "32000-1",
        name: "32000 Diesel",
      },
      failOnStatusCode: false,
    };
    let failMethodBody = "Method Not Allowed";
    cy.request(request).then((response) => {
      assert.equal(405, response.status);
      assert.equal(failMethodBody, response.body);
    });
  });

  //проверка тела ответа при неверном запросe (car вместо cars)
  it(`Wrong type in url for parallelum.com.br body.error should be 'invalid vehicle type'`, () => {
    let request = {
      method: "GET",
      url: `https://parallelum.com.br/fipe/api/v2/car/brands/48/years`,
      failOnStatusCode: false,
    };
    let failUrlBody = "invalid vehicle type";
    cy.request(request).then((response) => {
      assert.equal(400, response.status);
      assert.equal(failUrlBody, response.body.error);
    });
  });
});
