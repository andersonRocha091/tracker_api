const { config } = require("dotenv");
const { join } = require("path");
const { ok } = require("assert");
const env = process.env.NODE_ENV || "dev";
ok(
  env === "prod" || env === "dev",
  "env is invalid, it must be production, or dev"
);

const configPath = join(__dirname, "./config", `.env.${env}`);
config({
  path: configPath,
});

const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");

const Context = require("./db/strategies/base/ContextStrategy");
const Mysql = require("./db/strategies/mysqldb/Mysql");
const TrackerSchema = require("./db/strategies/mysqldb/schema/TrackerSchema");
const TrackerRoute = require("./routes/TrackerRoutes");
const UtilRoute = require("./routes/UtilRoutes");

const app = new Hapi.Server({
  port: process.env.PORT,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
function mapRoutes(instance, methods) {
  return methods.map((method) => instance[method]());
}

async function main() {
  const connection = await Mysql.connect();
  const context = new Context(
    new Mysql(connection.con, new TrackerSchema(connection.con))
  );

  await app.register([Inert, Vision]);

  try {
    await app.start();
    console.log(`Server running at port ${app.info.port}`);
  } catch (error) {
    console.log("erro", error);
  }

  app.route([...mapRoutes(new TrackerRoute(context), TrackerRoute.methods())]);
  return app;
}

module.exports = main();
