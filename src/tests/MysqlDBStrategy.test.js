const assert = require("assert");
const { expect } = require("chai");

const Mysql = require("../db/strategies/mysqldb/Mysql");
const Tracker = require("../db/strategies/mysqldb/schema/TrackerSchema");
const Context = require("../db/strategies/base/ContextStrategy");
const FakeData = require("../scripts/FakeData.json");
let context = {};

const MOCK_INSERT_ITEM = {
  tracker_uid: 12345,
  angle: 1,
  speed: 130,
  aquisition_time: 1593564093,
  visible_satellites: 0,
  engine: "on",
  event_id: 7,
  event_info: 0,
  insert_time: "2020-07-01 02:43:32",
  mileage: 248114.161,
  voltage: 12.4,
  driver_ibutton: 0,
  hdop: 0,
};

const MOCK_UPDATE_ITEM = {
  tracker_uid: 12344,
  angle: 1,
  speed: 156,
  aquisition_time: 1593564093,
  visible_satellites: 0,
  engine: "on",
  event_id: 7,
  event_info: 0,
  insert_time: "2020-07-01 02:43:32",
  mileage: 248114.161,
  voltage: 12.4,
  driver_ibutton: 0,
  hdop: 0,
};

describe("Testing connection and database interation", function () {
  this.timeout(Infinity);

  this.beforeAll(async () => {
    const connection = await Mysql.connect();
    context = new Context(
      new Mysql(connection.con, new Tracker(connection.con))
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

  it("Testing if the database is crated and connected", () => {
    assert.equal(context.isConnected(), "authenticated");
  });
  it("Insert an item into the database", async () => {
    const result = await context.create(MOCK_INSERT_ITEM);
    assert.equal(result.affectedRows, 1);
  });

  it("Listing an specific item by any attributes", async function () {
    const result = await context.read({ speed: 130 });
    assert.ok(result.length > 0);
  });

  it("Listing all itens", async function () {
    const result = await context.read({});
    assert.ok(result.length > 0);
  });

  it("Updating an track record", async function () {
    const [itemUpdate] = await context.read({ tracker_uid: 12345 });

    const newItem = {
      ...MOCK_UPDATE_ITEM,
      speed: 170,
    };
    const result = await context.update(itemUpdate.uid, newItem);
    assert.equal(result.affectedRows, 1);
  });

  it("Removing itens", async function () {
    const [item] = await context.read({ tracker_uid: 12344 });
    const result = await context.delete(item.uid);
    assert.ok(result.affectedRows);
  });

  it("Getting the speed rank by tracker_uid descendant", async () => {
    const [result] = await context.getSpeedRankByTrackerId();
    expect(result.speed).equal(198);
  });

  it("Getting the speed rank by tracker_uid ascendant", async () => {
    const [result] = await context.getSpeedRankByTrackerId("ASC");
    expect(result.speed).equal(150);
  });

  it("Getting the speed rank by tracker_uid descendant in 2020-07-01 02:43:32", async () => {
    const [result] = await context.getSpeedRankByTrackerId(
      "DESC",
      "2020-07-01 02:43:32"
    );
    expect(result.speed).equal(195);
  });

  it("Getting the speed rank by tracker_uid ascendant in 2020-07-01 02:43:32", async () => {
    const [result] = await context.getSpeedRankByTrackerId(
      "ASC",
      "2020-07-01 02:43:32"
    );
    expect(result.speed).equal(123);
  });

  it("Getting the speed rank by tracker_uid descendant between 2020-07-03 02:43:32 and 2020-07-04 02:43:32 ", async () => {
    const [result] = await context.getSpeedRankByTrackerId(
      "DESC",
      "2020-07-03 02:43:32",
      "2020-07-04 02:43:32"
    );
    expect(result.speed).equal(150);
  });

  it("Getting the speed rank by tracker_uid descendant between 2020-07-03 02:43:32 and 2020-07-04 02:43:32 ", async () => {
    const [result] = await context.getSpeedRankByTrackerId(
      "ASC",
      "2020-07-03 02:43:32",
      "2020-07-04 02:43:32"
    );
    expect(result.speed).equal(120);
  });

  it("Getting events by specific tracker_uid", async () => {
    const expected = [
      {
        tracker_uid: 12349,
        angle: 1,
        speed: 123,
        aquisition_time: 1593564093,
        visible_satellites: 0,
        engine: "on",
        event_id: 7,
        event_info: 0,
        insert_time: "2020-07-01T05:43:32.000Z",
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
        insert_time: "2020-07-02T05:43:32.000Z",
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
        insert_time: "2020-07-03T05:43:32.000Z",
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
        insert_time: "2020-07-04T05:43:32.000Z",
        mileage: 248114.161,
        voltage: 12.4,
        driver_ibutton: "0",
        hdop: 0,
      },
    ];
    const result = await context.getAllEventsByTrackerId(12349);
    let preData = JSON.stringify(result);
    let finalData = JSON.parse(preData);
    finalData = finalData.map((item) => {
      delete item.uid;
      return item;
    });
    assert.deepEqual(finalData, expected);
  });

  it("Must not retrieve any data if tracker_uid not specified", async () => {
    let expected = { statusCode: 400, message: "'tracker_uid' not specified" };
    const result = await context.getAllEventsByTrackerId();
    assert.deepEqual(result, expected);
  });

  it("Should retrieve all events by tracker_uid and specific date", async () => {
    const expected = {
      tracker_uid: 12348,
      angle: 1,
      speed: 80,
      aquisition_time: 1593564093,
      visible_satellites: 0,
      engine: "on",
      event_id: 7,
      event_info: 0,
      insert_time: "2020-07-04T05:43:32.000Z",
      mileage: 248114.161,
      voltage: 12.4,
      driver_ibutton: 0,
      hdop: 0,
    };
    const [result] = await context.getAllEventsByTrackerId(
      12348,
      "2020-07-04 02:43:32"
    );
    let preData = JSON.stringify(result);
    let finalData = JSON.parse(preData);
    delete finalData.uid;
    assert.deepEqual(finalData, expected);
  });

  it("Should get an specific item between two dates", async () => {
    const expected = {
      tracker_uid: 12347,
      angle: 1,
      speed: 90,
      aquisition_time: 1593564093,
      visible_satellites: 0,
      engine: "on",
      event_id: 7,
      event_info: 0,
      insert_time: "2020-07-04T05:43:32.000Z",
      mileage: 248114.161,
      voltage: 12.4,
      driver_ibutton: 0,
      hdop: 0,
    };
    const [result] = await context.getAllEventsByTrackerId(
      12347,
      "2020-07-04 00:00:00",
      "2020-07-04 23:59:59"
    );
    let preData = JSON.stringify(result);
    let finalData = JSON.parse(preData);
    delete finalData.uid;
    assert.deepEqual(finalData, expected);
  });
});
