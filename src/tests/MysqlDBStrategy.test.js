const assert = require("assert");

describe("Testing connection anda database interation", function () {
  this.timeout(15000);

  this.beforeAll(async () => {
    const connection = MongoDB.connect();
    context = new Context(new MongoDB(connection, RevenueSchema));
  });
  it("Testing if the database is crated and connected", () => {});
});
