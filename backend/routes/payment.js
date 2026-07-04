const express = require("express")
const Razorpay = require("razorpay")

const router = express.Router()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "YOUR_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET"
})

router.post("/create-order", async (req, res) => {
  const { amount } = req.body

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "rcpt_" + Date.now()
    })

    res.json(order)
  } catch (err) {
    console.error("Razorpay create-order error:", err)
    res.status(500).json({ message: "Failed to create Razorpay order", error: err.message || err })
  }
})

module.exports = router
