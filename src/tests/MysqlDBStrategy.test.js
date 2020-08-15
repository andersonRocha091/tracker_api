const assert = require("assert");
const { promisify } = require("util");
const { config } = require("dotenv");
const { join } = require("path");
const { ok } = require("assert");

const Mysql = require("../db/mysqldb/Mysql");

describe("Testing connection anda database interation", function () {
  this.timeout(15000);
  this._connection = {};
  this.beforeAll(async () => {
    const env = "dev";
    const configPath = join(__dirname, "../config", `.env.${env}`);
    config({
      path: configPath,
    });
    this._connection = await Mysql.connect();
  });
  it("Testing if the database is crated and connected", () => {
    assert.equal(this._connection.con.state, "authenticated");
  });
});
