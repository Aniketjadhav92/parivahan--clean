const express = require("express");
const router = express.Router();

const Seat = require("../models/Seat");
const Booking = require("../models/Booking");

const COLS = ['A','B','C','D'];

// GET SEATS
router.get("/seat", async (req, res) => {
  const { routeId, date } = req.query;

  let seatData = await Seat.findOne({ routeId, busDate: date });

  if (!seatData) {
    const seats = [];

    for (let r = 1; r <= 8; r++) {
      for (let c = 0; c < 4; c++) {
        seats.push({
          seatNumber: `${r}${COLS[c]}`,
          isBooked: false
        });
      }
    }

    seatData = await Seat.create({
      routeId,
      busDate: date,
      seats
    });
  }

  res.json(seatData);
});

// BOOK SEATS
router.post("/book", async (req, res) => {
  const { routeId, seats, totalPrice, date, name, mobile, email } = req.body;

  const seatData = await Seat.findOne({ routeId, busDate: date });

  seatData.seats = seatData.seats.map(s => {
    if (seats.includes(s.seatNumber)) {
      return { ...s._doc, isBooked: true };
    }
    return s;
  });

  await seatData.save();

  const booking = await Booking.create({
    routeId,
    seatsBooked: seats,
    totalPrice,
    name,
    mobile,
    email
  });

  res.json({ message: "Booking successful", booking });
});

module.exports = router;
