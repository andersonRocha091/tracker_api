const assert = require("assert");
const mongoose = require("mongoose");
const api = require("../Api");
const MongoDB = require("../db/strategies/mongodb/MongoDB");
const RevenueSchema = require("../db/strategies/mongodb/schemes/RevenueSchema");
const Context = require("../db/strategies/base/ContextStrategy");
const Mysql = require("../../db/strategies/mysqldb/Mysql");

let app = {};
let context = {};
describe("Api Test Suit", function () {
  this.beforeAll(async () => {
    app = await api;
    context = new Context(new Mysql());
  });

  // this.beforeEach(async () => {
  //   context = new Context(new MongoDB(mongoose.connection, RevenueSchema));
  //   await context.deleteAll();
  // });

  // this.afterAll(async () => {
  //   context = new Context(new MongoDB(mongoose.connection, RevenueSchema));
  //   await context.deleteAll();
  // });

  it("Must import all deals from pipedrive POST - /deals", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/deals?start=0&limit=10",
      payload: {
        start: 0,
        limit: 10,
        status: "all_not_deleted",
      },
    });
    const { results } = JSON.parse(result.payload);
    assert.ok(results);
  });
});
