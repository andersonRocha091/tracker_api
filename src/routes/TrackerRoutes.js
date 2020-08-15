const joi = require("@hapi/joi");
const boom = require("boom");

const BaseRoute = require("./base/BaseRoute");
const failAction = (request, headers, erro) => {
  throw erro;
};

class TrackerRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }
  list() {
    return {
      path: "/tracker",
      method: "GET",
      options: {
        validate: {
          failAction,
          query: joi.object({
            skip: joi.number().integer().default(0),
            limit: joi.number().integer().default(10),
          }),
        },
      },
      handler: async (request, headers) => {
        try {
          const { skip, limit } = request.query;
          const result = await this.db.read({}, skip, limit);
          return result;
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }

  create() {
    return {
      path: "/tracker",
      method: "POST",
      options: {
        validate: {
          failAction,
          payload: joi.object({
            tracker_uid: joi.number().max(99999).required(),
            angle: joi.number().max(999).default(0),
            speed: joi.number().max(999).required(),
            aquisition_time: Joi.date().timestamp(),
            visible_satellites: joi.number().max(999).default(0),
            engine: joi.string().max(3).default("on"),
            event_id: joi.number().max(99999).default(0),
            event_info: joi.number().max(999).default(0),
            insert_time: joi
              .string()
              .regex(
                /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]/
              ),
            mileage: joi.number().min(0.0).max(999999999.999).default(0.0),
            driver_ibutton: joi.string().max(16),
            hdop: joi.number().min(0.0).max(999999.999),
          }),
        },
      },
      handler: async (request) => {
        try {
          const {
            value,
            pipedriveId,
            day,
            year,
            month,
            description,
          } = request.payload;
          const result = await this.db.create({
            value,
            pipedriveId,
            day,
            year,
            month,
            description,
          });
          return {
            message: "Revenue inserted successfully",
            _id: result._id,
          };
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: "/revenues/{id}",
      method: "PATCH",
      options: {
        validate: {
          failAction,
          params: joi.object({
            id: joi.string().required(),
          }),
          payload: joi.object({
            value: joi.number().min(1),
            pipedriveId: joi.number().min(1),
            day: joi.number().min(1).max(31),
            month: joi.number().min(1).max(12),
            description: joi.string(),
            year: joi.number().min(1900),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const { payload } = request;
          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);

          const result = await this.db.update(id, dados);
          if (result.nModified !== 1)
            return boom.preconditionFailed("Cant update revenue");
          return {
            message: "Revenue updated successfully",
          };
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }

  delete() {
    return {
      path: "/revenues/{id}",
      method: "DELETE",
      options: {
        validate: {
          failAction,
          params: joi.object({
            id: joi.string().required(),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);
          if (result.n !== 1) {
            return boom.preconditionFailed("Id Not Found");
          }

          return {
            message: "Revenue removed successfully",
          };
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }

  sum() {
    return {
      path: "/revenues/sum",
      method: "GET",
      options: {
        validate: {
          failAction,
          query: joi.object({
            year: joi.boolean(),
            month: joi.boolean(),
            day: joi.boolean(),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { year, month, day } = request.query;
          const result = await this.db.sum(year, month, day);

          return {
            message: result,
          };
        } catch (error) {
          return boom.internal();
        }
      },
    };
  }
}

module.exports = TrackerRoutes;
