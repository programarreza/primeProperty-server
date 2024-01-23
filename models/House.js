const mongoose = require("mongoose");

const houseSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bedroom: {
    type: String,
  },
  image: {
    type: String,
  },
  room_size: {
    type: String,
  },
  availability: {
    type: String,
  },
  rent: {
    type: Number,
  },
  phone: {
    type: Number,
  },
  description: {
    type: String,
  },

});

const House = mongoose.model("house", houseSchema);
module.exports = House;
