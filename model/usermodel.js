const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
  
  },
  
  password: {
    type: String,
    required: true,

  }
});
const users = mongoose.model("user", userSchema);
module.exports = users;
