const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const EventSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  posterurl: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  society: {
    type: String,
    require: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },

  tags: {
    type: [String],
    require: false,
  },
});

const Event = model("event", EventSchema);

module.exports = Event;
