const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
  },
  image: {
    type: String,
  },
  token: {
    type: String,
  },
});

const Users = mongoose.model("user", userSchema);
module.exports = Users;
