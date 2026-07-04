const mongoose = require('mongoose');

const departureSchema = new mongoose.Schema({
  departure: { type: String, required: true },
  arrival: { type: String, required: true },
  busName: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  seats: { type: Number, required: true },
  rating: { type: Number, required: true },
  ac: { type: Boolean, default: false },
  fewSeats: { type: Boolean, default: false },
});

const routeSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  duration: { type: String, required: true },
  routeName: { type: String, required: true },
  departures: [departureSchema],
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);