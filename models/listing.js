const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: String,
  description: String,
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  likes: { type: Number, default: 0 },
  houseType: String,
  hostName: String,
  hostContact: String,
  reviewsCount: { type: Number, default: 0 },
  starCount: { type: Number, default: 0 },
  facilities: [String],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
