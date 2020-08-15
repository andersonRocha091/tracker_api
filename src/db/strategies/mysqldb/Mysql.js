const mysql = require("mysql");

const ICrud = require("../interfaces/InterfaceCrud");
class Mysql extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }
  static async connect() {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });

    return new Promise((resolve, reject) => {
      connection.connect((error) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            status: 200,
            message: `successfully connected at ${process.env.MYSQL_HOST}`,
            con: connection,
          });
        }
      });
    });
  }

  isConnected() {
    return this._connection.state;
  }

  async create(item) {
    return this._schema.create(item);
  }

  async read(item = {}, skip, limit) {
    return this._schema.read(item, skip, limit);
  }
  async update(id, item, upsert) {
    const fn = upsert ? "upsert" : "update";
    const query = upsert ? { returning: true } : { where: { id: id } };
    return this._schema[fn](item, query);
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }
}
module.exports = Mysql;
