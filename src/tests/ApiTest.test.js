const assert = require("assert");
const { expect } = require("chai");
const api = require("../Api");
const Mysql = require("../db/strategies/mysqldb/Mysql");
const TrackerSchema = require("../db/strategies/mysqldb/schema/TrackerSchema");
const Context = require("../db/strategies/base/ContextStrategy");

let app = {};
let context = {};
describe("Starting API Tests", async function () {
  this.beforeAll(async () => {
    let app = await api;
    const connection = await Mysql.connect();
    context = new Context(
      new Mysql(connection.con, new TrackerSchema(connection.con))
    );
  });

  it("Should create a new tracker record", () => {
    assert.equal(1, 1);
  });
});
