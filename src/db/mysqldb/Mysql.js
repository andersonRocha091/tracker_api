const mysql = require("mysql");

const ICrud = require("../strategies/interfaces/InterfaceCrud");
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
}
module.exports = Mysql;
