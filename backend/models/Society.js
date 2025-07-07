const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcrypt");
const societySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: { type: String },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
default: "rejected",
  },
  password: { type: String },
});
societySchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Society = model("society", societySchema);

module.exports = Society;
