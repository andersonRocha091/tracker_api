const axios = require("axios");

class PipedriveService {
  constructor(start, limit, status, db) {
    this._start = start;
    this._limit = limit;
    this._status = status;
    this._db = db;
  }

  insertNewRevenue({ id, title, value, update_time, status }) {
    let wonDate = new Date(update_time);

    let revenue = {
      pipedriveId: id,
      description: title,
      blingId: "",
      value,
      status,
      year: wonDate.getFullYear(),
      month: wonDate.getMonth() + 1,
      day: wonDate.getDate(),
    };

    return new Promise((resolve, reject) => {
      this._db
        .create(revenue)
        .then((item) => {
          resolve(item);
        })
        .catch((error) => {
          resolve({});
        });
    });
  }

  async getDeals(page = 0, limit = 0, status) {
    const { data } = await axios.get(
      `${process.env.PIPEDRIVE_API_URL}?status=${status}&start=${page}&limit=${limit}&api_token=${process.env.PIPEDRIVE_TOKEN}`
    );
    if (data.success && data.data.length > 0) {
      let promises = [];
      let result = [];
      const more_items_in_collection =
        data.additional_data.pagination.more_items_in_collection;

      data.data.forEach((deal) => {
        promises.push(this.insertNewRevenue({ ...deal }));
      });
      result = await Promise.all(promises);
      result = result.filter((item) => item._id);
      return { more_items_in_collection, result };
    }
    return { more_items_in_collection: false, result };
  }

  async getAllPipeDriveDeals() {
    let page = this._start;
    let allDeals = [];
    let response = await this.getDeals(page, this._limit, this._status);
    allDeals = allDeals.concat(response.result);

    while (response.more_items_in_collection === true) {
      page++;
      response = await this.getDeals(page, this._limit, this._status);
      allDeals = allDeals.concat(response.result);
    }

    return { page, results: allDeals };
  }
}

module.exports = PipedriveService;
