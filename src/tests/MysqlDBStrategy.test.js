const assert = require("assert");

const { config } = require("dotenv");
const { join } = require("path");

const Mysql = require("../db/strategies/mysqldb/Mysql");
const Tracker = require("../db/strategies/mysqldb/schema/TrackerSchema");
const Context = require("../db/strategies/base/ContextStrategy");
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
  tracker_uid: 12345,
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

describe("Testing connection anda database interation", function () {
  this.timeout(15000);
  this._connection = {};
  this.beforeAll(async () => {
    const env = "dev";
    const configPath = join(__dirname, "../config", `.env.${env}`);
    config({
      path: configPath,
    });
    const connection = await Mysql.connect();
    context = new Context(
      new Mysql(connection.con, new Tracker(connection.con))
    );
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

  it("Updating an track record", async function () {
    const [itemUpdate] = await context.read({ uid: 40 });

    const newItem = {
      ...MOCK_UPDATE_ITEM,
      tracker_uid: 12349,
      speed: 170,
    };
    const result = await context.update(itemUpdate.uid, newItem);
    assert.equal(result.affectedRows, 1);
  });

  it("Removing itens", async function () {
    const [item] = await context.read({});
    const result = await context.delete(item.uid);
    assert.ok(result.affectedRows);
  });

  it("Getting and rank of speed by tracker_uid", async () => {
    const [result] = await context.getSpeedRankByTrackerId(
      "DESC",
      "2020-07-01 02:43:34",
      "2020-07-02 02:43:32"
    );
    assert.ok(result.tracker_uid);
  });
});
