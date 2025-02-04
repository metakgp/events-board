const mongoose = require("mongoose");
const { model, Schema } = mongoose;

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
    required:true,
  },
  description: { type: String },
  status: {
    type: String,
    enum:['pending','accepted',"rejected"],
    default:'rejected',
  },
  password: { type: String },
});
const Society=model("society",societySchema);

module.exports=Society;