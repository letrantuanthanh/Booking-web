const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  photos: {
    type: [String],
    required: true,
  },
  cheapestPrice: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
  },
  rooms: {
    type: [String],
    required: true,
  },
});

hotelSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Hotel", hotelSchema);
