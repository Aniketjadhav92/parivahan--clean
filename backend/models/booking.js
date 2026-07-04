const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route"
  },
  seatsBooked: [String],
  totalPrice: Number,
  name: String,
  mobile: String,
  email: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
