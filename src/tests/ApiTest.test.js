const assert = require("assert");
const { expect } = require("chai");
const api = require("../Api");
const Mysql = require("../db/strategies/mysqldb/Mysql");
const TrackerSchema = require("../db/strategies/mysqldb/schema/TrackerSchema");
const Context = require("../db/strategies/base/ContextStrategy");
const FakeData = require("../scripts/FakeData.json");

let app = {};
let context = {};
const MOCK_ITEM_INSERT = {
  tracker_uid: 12345,
  angle: 0,
  speed: 157,
  aquisition_time: Math.floor(new Date().getTime() / 1000),
  visible_satellites: 0,
  engine: "on",
  event_id: 6,
  event_info: 0,
  insert_time: "2020-08-15 22:43:52",
  mileage: 1000,
  voltage: 12.4,
  driver_ibutton: "0",
  hdop: 0,
};
let MOCK_ID = "";
describe("Starting API Tests", async function () {
  this.beforeAll(async () => {
    app = await api;
    const connection = await Mysql.connect();
    context = new Context(
      new Mysql(connection.con, new TrackerSchema(connection.con))
    );
    let promises = [];
    FakeData.forEach((item) => {
      promises.push(context.create(item));
    });
    await Promise.all(promises);
  });

  this.afterAll(async () => {
    await context.delete();
  });

  it("Should create a new tracker record", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/tracker",
      payload: MOCK_ITEM_INSERT,
    });
    const { statusCode, uid } = JSON.parse(result.payload);
    MOCK_ID = uid;
    assert.equal(statusCode, 200);
  });

  it("Should list itens paginated", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/tracker?skip=0&limit=10",
    });
    const { statusCode, dados } = JSON.parse(result.payload);
    assert.equal(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("List /tracker - must return only 3 records", async () => {
    const LIMIT_SIZE = 3;
    const result = await app.inject({
      method: "GET",
      url: `/tracker?skip=0&limit=${LIMIT_SIZE}`,
    });
    const { statusCode, dados } = JSON.parse(result.payload);
    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === LIMIT_SIZE);
  });

  it("List /tracker - must fail for invalid limit", async () => {
    const LIMIT_SIZE = "AEEW";
    const result = await app.inject({
      method: "GET",
      url: `/tracker?skip=0&limit=${LIMIT_SIZE}`,
    });
    const { statusCode } = JSON.parse(result.payload);
    assert.deepEqual(statusCode, 400);
  });

  it("Update Object Partially /tracker/:id", async () => {
    const uid = MOCK_ID;
    const expected = {
      angle: 120,
      insert_time: "1991-09-02 10:54:32",
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/tracker/${uid}`,
      payload: JSON.stringify(expected),
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Track record updated successfully");
  });

  it("Update Object Partially /tracker/:uid - incorrect uid not update", async () => {
    const uid = 200000;
    const updatedAttribute = {
      speed: 567,
    };
    const result = await app.inject({
      method: "PATCH",
      url: `/tracker/${uid}`,
      payload: JSON.stringify(updatedAttribute),
    });

    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Can't update tracker record",
    };
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 412);
    assert.deepEqual(expected, dados);
  });
});
