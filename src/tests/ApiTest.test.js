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

  it("Update Object Partially /tracker/:uid", async () => {
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

  it("Delete DELETE /tracker/:uid", async () => {
    const uid = MOCK_ID;
    const result = await app.inject({
      method: "DELETE",
      url: `/tracker/${uid}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Tracker record removed successfully");
  });

  it("Delete DELETE /tracker/:uid - invalid uid", async () => {
    const uid = 3000000;
    const result = await app.inject({
      method: "DELETE",
      url: `/tracker/${uid}`,
    });
    const expected = {
      statusCode: 412,
      error: "Precondition Failed",
      message: "Id Not Found",
    };
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 412);
    assert.deepEqual(expected, dados);
  });

  it("Delete DELETE /tracker/:uid - do not remove data it causes excepection", async () => {
    const uid = `ID_INVALIDO`;
    const result = await app.inject({
      method: "DELETE",
      url: `/tracker/${uid}`,
    });
    const expected = {
      error: "Internal Server Error",
      message: "An internal server error occurred",
      statusCode: 500,
    };
    const dados = JSON.parse(result.payload);

    assert.deepEqual(expected, dados);
  });

  it("Should Get the speed rank by tracker_uid descendant", async () => {
    const result = await app.inject({
      method: "GET",
      url: `/tracker/rank`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    expect(dados["message"][0].speed).equal(198);
  });

  it("Should get the speed rank by tracker_uid ascendant", async () => {
    const result = await app.inject({
      method: "GET",
      url: `/tracker/rank?order=ASC`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    expect(dados["message"][0].speed).equal(150);
  });

  it("Should get the speed rank by tracker_uid descendant in 2020-07-01 02:43:32", async () => {
    const result = await app.inject({
      method: "GET",
      url: `/tracker/rank?order=DESC&startDate=2020-07-01 02:43:32`,
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    expect(dados["message"][0].speed).equal(195);
  });

  it("Should get an error on retrieving the speed rank by tracker_uid descendant in 2020-07-01", async () => {
    const result = await app.inject({
      method: "GET",
      url: `/tracker/rank?order=DESC&startDate=2020-07-01`,
    });
    const expected = {
      statusCode: 400,
      error: "Bad Request",
    };
    const statusCode = result.statusCode;
    const { error } = JSON.parse(result.payload);

    assert.ok(statusCode === 400);
    assert.deepEqual(expected, { statusCode, error });
  });

  it("Should get the speed rank by tracker_uid descendant between 2020-07-03 02:43:32 and 2020-07-04 02:43:32", async () => {
    const result = await app.inject({
      method: "GET",
      url: `/tracker/rank?order=DESC&startDate=2020-07-03 02:43:32&endDate=2020-07-04 02:43:32`,
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    assert.ok(statusCode === 200);
    expect(dados["message"][0].speed).equal(150);
  });

  it("Should get all events by track_uid", async () => {
    let expected = [
      {
        tracker_uid: 12349,
        angle: 1,
        speed: 123,
        aquisition_time: 1593564093,
        visible_satellites: 0,
        engine: "on",
        event_id: 7,
        event_info: 0,
        insert_time: "2020-07-01 02:43:32",
        mileage: 248114.161,
        voltage: 12.4,
        driver_ibutton: "0",
        hdop: 0,
      },
      {
        tracker_uid: 12349,
        angle: 1,
        speed: 198,
        aquisition_time: 1593564093,
        visible_satellites: 0,
        engine: "on",
        event_id: 7,
        event_info: 0,
        insert_time: "2020-07-02 02:43:32",
        mileage: 248114.161,
        voltage: 12.4,
        driver_ibutton: "0",
        hdop: 0,
      },
      {
        tracker_uid: 12349,
        angle: 1,
        speed: 70,
        aquisition_time: 1593564093,
        visible_satellites: 0,
        engine: "on",
        event_id: 7,
        event_info: 0,
        insert_time: "2020-07-03 02:43:32",
        mileage: 248114.161,
        voltage: 12.4,
        driver_ibutton: "0",
        hdop: 0,
      },
      {
        tracker_uid: 12349,
        angle: 1,
        speed: 123,
        aquisition_time: 1593564093,
        visible_satellites: 0,
        engine: "on",
        event_id: 7,
        event_info: 0,
        insert_time: "2020-07-04 02:43:32",
        mileage: 248114.161,
        voltage: 12.4,
        driver_ibutton: "0",
        hdop: 0,
      },
    ];

    const result = await app.inject({
      method: "GET",
      url: `/tracker/event?tracker_uid=12349`,
    });
    const data = JSON.parse(result.payload);

    let finalData = data.message.map((item) => {
      delete item.uid;
      return item;
    });
    assert.deepEqual(finalData, expected);
  });

  it("Must not retrieve any data from api if tracker_uid not specified", async () => {
    let statusCodeExpected = 400;
    const result = await app.inject({
      method: "GET",
      url: `/tracker/event`,
    });
    const { statusCode } = JSON.parse(result.payload);
    assert.equal(statusCode, statusCodeExpected);
  });

  it("Should retrieve all events from API by tracker_uid and specific date", async () => {
    const expected = {
      tracker_uid: 12348,
      angle: 1,
      speed: 170,
      aquisition_time: 1593564093,
      visible_satellites: 0,
      engine: "on",
      event_id: 7,
      event_info: 0,
      insert_time: "2020-07-02 02:43:32",
      mileage: 248114.161,
      voltage: 12.4,
      driver_ibutton: "0",
      hdop: 0,
    };

    const result = await app.inject({
      method: "GET",
      url: `/tracker/event?tracker_uid=12348&startDate=2020-07-02 02:43:32`,
    });
    const { message } = JSON.parse(result.payload);
    let item = message[0];
    delete item.uid;
    assert.deepEqual(item, expected);
  });

  // it("Should get an specific item between two dates", async () => {
  //   const expected = {
  //     tracker_uid: 12347,
  //     angle: 1,
  //     speed: 90,
  //     aquisition_time: 1593564093,
  //     visible_satellites: 0,
  //     engine: "on",
  //     event_id: 7,
  //     event_info: 0,
  //     insert_time: "2020-07-04 02:43:32",
  //     mileage: 248114.161,
  //     voltage: 12.4,
  //     driver_ibutton: 0,
  //     hdop: 0,
  //   };
  //   const [result] = await context.getAllEventsByTrackerId(
  //     12347,
  //     "2020-07-04 00:00:00",
  //     "2020-07-04 23:59:59"
  //   );
  //   let preData = JSON.stringify(result);
  //   let finalData = JSON.parse(preData);
  //   delete finalData.uid;
  //   assert.deepEqual(finalData, expected);
  // });
});
