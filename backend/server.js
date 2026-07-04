const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const routeRoutes = require('./routes/routes');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/parivahan'
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payment', paymentRoutes);

// Global error monitoring
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
})

process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
})

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
