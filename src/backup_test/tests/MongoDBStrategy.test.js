const assert = require("assert");
const MongoDB = require("../db/strategies/mongodb/MongoDB");
const RevenueSchema = require("../db/strategies/mongodb/schemes/RevenueSchema");
const Context = require("../db/strategies/base/ContextStrategy");

let context = {};
const MOCK_REVENUE_INSERT = {
  value: 100,
  pipedriveId: "5",
  description: "First ever revenue",
  year: "2020",
  month: "08",
  day: "05",
};
const MOCK_REVENUE_UPDATE = {
  value: 150,
  pipedriveId: "4",
  description: `Revenue updated-${Date.now()}`,
  year: "2020",
  month: "08",
  day: "05",
};
let MOCK_REVENUE_UPDATE_ID = "";
describe("MongoDB test suit", function () {
  this.timeout(15000);

  this.beforeAll(async () => {
    const connection = MongoDB.connect();
    context = new Context(new MongoDB(connection, RevenueSchema));
  });

  it("MongoDB Connection", async () => {
    const result = await context.isConnected();
    const expected = "Connected";
    const { _id } = await context.create(MOCK_REVENUE_UPDATE);
    MOCK_REVENUE_UPDATE_ID = _id;

    assert.deepEqual(result, expected);
  });

  it("MongoDB inserting new item", async () => {
    const {
      value,
      pipedriveId,
      description,
      year,
      month,
      day,
    } = await context.create(MOCK_REVENUE_INSERT);
    assert.deepEqual(
      { value, pipedriveId, description, year, month, day },
      MOCK_REVENUE_INSERT
    );
  });

  it("Listing item", async () => {
    const [
      { value, pipedriveId, description, year, month, day },
    ] = await context.read(
      {
        description: MOCK_REVENUE_INSERT.description,
      },
      0,
      10
    );

    assert.deepEqual(
      { value, pipedriveId, description, year, month, day },
      MOCK_REVENUE_INSERT
    );
  });

  it("Updating a revenue", async () => {
    const result = await context.update(MOCK_REVENUE_UPDATE_ID, {
      description: "Revenue to be updated",
    });
    assert.deepEqual(result.nModified, 1);
  });

  it("Remove revenue", async () => {
    const result = await context.delete(MOCK_REVENUE_UPDATE_ID);
    assert.deepEqual(result.n, 1);
  });
});
