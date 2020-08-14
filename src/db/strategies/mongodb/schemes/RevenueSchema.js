const Mongoose = require("mongoose");
const revenueSchema = new Mongoose.Schema({
  value: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pipedriveId: {
    type: Number,
    required: true,
    unique: true,
  },
  year: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  blingId: {
    type: String,
  },
  insertedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = Mongoose.model("revenues", revenueSchema);
