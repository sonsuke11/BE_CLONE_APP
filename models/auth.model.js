const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const authSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});
module.exports = mongoose.model("auth", authSchema);
