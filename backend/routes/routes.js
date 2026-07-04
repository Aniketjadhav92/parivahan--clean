const express = require('express');
const Route = require('../models/Route');

const router = express.Router();

// Get all routes or filter by from/to
router.get('/', async (req, res) => {
  try {
    const { from, to } = req.query;
    const query = {};
    if (from) query.from = new RegExp(`^${from.trim()}$`, 'i');
    if (to) query.to = new RegExp(`^${to.trim()}$`, 'i');

    const routes = await Route.find(query);
    res.json(routes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;