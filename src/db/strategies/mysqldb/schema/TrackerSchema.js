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
    const condition = await this.getConditions(item);
    let sql = `SELECT * FROM tracking_202007_new ${condition} LIMIT ${limit} OFFSET ${skip}`;
    return this.executeQuery(sql);
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

  getConditions(item) {
    return new Promise((resolve, reject) => {
      let conditionWhereClause = "WHERE ";
      let keysSize = Object.keys(item).length;
      if (keysSize == 0) return "";
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
