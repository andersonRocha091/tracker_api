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
      path: "/revenues",
      method: "POST",
      options: {
        validate: {
          failAction,
          payload: joi.object({
            value: joi.number().min(1).required(),
            pipedriveId: joi.number().min(1).required(),
            day: joi.number().min(1).max(31).required(),
            month: joi.number().min(1).max(12).required(),
            description: joi.string().required(),
            year: joi.number().min(1900).required(),
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
