const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route"
  },
  busDate: String,

  seats: [
    {
      seatNumber: String,
      isBooked: {
        type: Boolean,
        default: false
      }
    }
  ]
});

module.exports = mongoose.model("Seat", seatSchema);
