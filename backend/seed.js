const mongoose = require('mongoose');
const User = require('./models/User');
const Route = require('./models/Route');
require('dotenv').config();

const users = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'john123',
    phone: '+91 9876543210',
    profileImage: 'https://via.placeholder.com/100x100/77879e/ffffff?text=JD',
    memberSince: 'January 2024',
    totalBookings: 12,
    favoriteRoutes: ['Sangli → Vita', 'Karad → Vita', 'Tasgaon → Vita']
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'jane456',
    phone: '+91 9876543211',
    profileImage: 'https://via.placeholder.com/100x100/77879e/ffffff?text=JS',
    memberSince: 'March 2024',
    totalBookings: 8,
    favoriteRoutes: ['Vita → Sangli', 'Kolhapur → Vita', 'Satara → Karad']
  },
  {
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    password: 'rajesh789',
    phone: '+91 9876543212',
    profileImage: 'https://via.placeholder.com/100x100/77879e/ffffff?text=RK',
    memberSince: 'February 2024',
    totalBookings: 15,
    favoriteRoutes: ['Kolhapur → Sangli', 'Satara → Vita', 'Khanapur → Tasgaon']
  },
  {
    name: 'Aniket',
    email: 'aniket45@gmail.com',
    password: '12345',
    phone: '+91 9876543213',
    profileImage: '../images/Screenshot 2026-04-08 211906.png',
    memberSince: 'April 2024',
    totalBookings: 5,
    favoriteRoutes: ['Vita → Sangli', 'Karad → Vita']
  }
];

const cities = ['Vita', 'Mayni', 'Sangli', 'Tasgaon', 'Karad', 'Kadegaon', 'Kolhapur', 'Satara', 'Khanapur', 'Jat']

const timeSlots = ['10:00', '12:00', '14:00', '16:00', '18:00']

const formatTime = (hour, minute) => `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`

const addMinutes = (time, minutesToAdd) => {
  const [hours, minutes] = time.split(':').map(Number)
  const total = hours * 60 + minutes + minutesToAdd
  const newHours = Math.floor(total / 60)
  const newMinutes = total % 60
  return formatTime(newHours, newMinutes)
}

const buildRoute = (from, to, index) => {
  const duration = index % 2 === 0 ? '2h 00m' : '2h 30m'
  const basePrice = 100 + ((from.length + to.length) % 5) * 20
  const busType = index % 3 === 0 ? 'A/C Deluxe' : index % 3 === 1 ? 'Semi-Deluxe' : 'Ordinary'
  const ac = busType === 'A/C Deluxe'

  return {
    from,
    to,
    duration,
    routeName: `${from} → ${to}`,
    departures: timeSlots.map((departure, timeIndex) => ({
      departure,
      arrival: addMinutes(departure, duration === '2h 30m' ? 150 : 120),
      busName: `${from} ${to} ${busType.replace(' ', '')}`,
      type: busType,
      price: basePrice + timeIndex * 10,
      seats: 24 - timeIndex * 2,
      rating: Number((4.0 + (timeIndex * 0.1) + (index % 3) * 0.05).toFixed(1)),
      ac,
      fewSeats: timeIndex === timeSlots.length - 1,
    })),
  }
}

const routes = []

cities.forEach((from, fromIndex) => {
  cities.forEach((to, toIndex) => {
    if (from !== to) {
      routes.push(buildRoute(from, to, fromIndex + toIndex))
    }
  })
})

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/parivahan');
    await User.deleteMany({});
    await Route.deleteMany({});
    await User.insertMany(users);
    await Route.insertMany(routes);
    console.log('Database seeded');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();