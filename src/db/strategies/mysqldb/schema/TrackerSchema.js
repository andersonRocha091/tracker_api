class Tracker {
  constructor(connection) {
    this._connection = connection;
  }

  async create({
    tracker_uid,
    angle,
    speed,
    aquisition_time,
    visible_satellites,
    engine,
    event_id,
    event_info,
    insert_time,
    mileage,
    voltage,
    driver_ibutton,
    hdop,
  }) {
    let sql = `INSERT INTO tracking_202007_new (tracker_uid,
        angle,
        speed,
        aquisition_time,
        visible_satellites,
        engine,
        event_id,
        event_info,
        insert_time,
        mileage,
        voltage,
        driver_ibutton,
        hdop) VALUES (${tracker_uid},
          ${angle},
          ${speed},
          ${aquisition_time},
          ${visible_satellites},
          '${engine}',
          ${event_id},
          ${event_info},
          '${insert_time}',
          ${mileage},
          ${voltage},
          ${driver_ibutton},
          ${hdop})`;
    return this.executeQuery(sql);
  }

  async read(item = {}, skip = 0, limit = 10) {
    const condition = await this.getFilterConditions(item);
    let sql = `SELECT * FROM tracking_202007_new ${condition} LIMIT ${limit} OFFSET ${skip}`;
    return this.executeQuery(sql);
  }

  async update(id, item, upsert) {
    let sql = "UPDATE tracking_202007_new SET ";
    const filter = await this.getFilterConditions({ uid: id });
    let itensUpdate = await this.getUpdateParams(item);
    sql = sql + itensUpdate + " " + filter;
    return this.executeQuery(sql);
  }

  async delete(query) {
    const whereCondition = await this.getFilterConditions(query);
    let sql = `DELETE FROM tracking_202007_new ` + whereCondition;
    return this.executeQuery(sql);
  }

  executeQuery(sql) {
    return new Promise((resolve, reject) => {
      this._connection.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  getUpdateParams(item) {
    return new Promise((resolve, reject) => {
      let params = "";
      let keysSize = Object.keys(item).length;
      if (keysSize == 0) resolve("");
      Object.keys(item).forEach((element, key) => {
        params +=
          element === "insert_time" || element === "engine"
            ? `${element}='${item[element]}'`
            : `${element}=${item[element]}`;
        params += keysSize > 1 && key < keysSize - 1 ? ", " : " ";
      });
      resolve(params);
    });
  }

  getFilterConditions(item) {
    return new Promise((resolve, reject) => {
      let conditionWhereClause = "WHERE ";
      let keysSize = Object.keys(item).length;
      if (keysSize == 0) resolve("");
      Object.keys(item).forEach((element, key) => {
        conditionWhereClause += `(${element} = ${item[element]}) `;
        conditionWhereClause +=
          keysSize > 1 && key < keysSize - 1 ? "AND " : "";
      });
      resolve(conditionWhereClause);
    });
  }
}

module.exports = Tracker;
