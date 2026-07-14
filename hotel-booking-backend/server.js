import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dns from "node:dns";

dotenv.config();

// Force Google DNS (fixes local DNS SRV issue)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// ==================== MONGOOSE SCHEMAS ====================

// User Schema (matches your DB structure)
const userSchema = new mongoose.Schema({
  name: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: "admin",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Room Schema (matches your DB structure)
const roomSchema = new mongoose.Schema({
  number: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  type: { 
    type: String, 
    enum: ['AC', 'Non-AC'], 
    default: 'AC' 
  },
  isBooked: { 
    type: Boolean, 
    default: false 
  },
  booking: {
    guestName: { type: String },
    guestEmail: { type: String },
    fromDate: { type: Date },
    toDate: { type: Date },
    price: { type: Number },
    notes: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Room = mongoose.model('Room', roomSchema);

// ==================== EXPRESS APP ====================

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://hotel-management-system-backend-five.vercel.app"
  
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// ==================== CONFIG ====================

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotel_management';
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';
const PRICE_PER_DAY = 5000;

// Hotel Info (static configuration)
const hotelInfo = {
  name: 'Sample Hotel',
  totalRooms: 8,
  roomType: 'All AC',
  complementaryBreakfast: true,
  conditions: 'Seasonal days price may vary',
  basePricePerDay: PRICE_PER_DAY,
};

// ==================== HELPER FUNCTIONS ====================

// Calculate price based on dates
function calculatePrice(fromDate, toDate) {
  try {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (isNaN(from) || isNaN(to) || to <= from) return PRICE_PER_DAY;
    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.ceil((to - from) / msPerDay);
    return days * PRICE_PER_DAY;
  } catch {
    return PRICE_PER_DAY;
  }
}

// Seed rooms if database is empty
async function seedRoomsIfNeeded() {
  const count = await Room.countDocuments();
  if (count === 0) {
    const rooms = Array.from({ length: 8 }, (_, i) => ({ 
      number: i + 1, 
      type: 'AC',
      isBooked: false,
    }));
    await Room.insertMany(rooms);
    console.log('✅ Seeded 8 AC rooms');
  }
}

// ==================== MIDDLEWARE ====================

// Authentication Middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }
  
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// ==================== AUTH ROUTES ====================

// Health Check
app.get('/api/health', async (req, res) => {
  try {
    const mongoState = mongoose.connection.readyState; // 1 = connected
    const total = await Room.countDocuments().catch(() => -1);
    
    res.json({ 
      ok: true, 
      mongoState, 
      totalRoomsInDb: total,
      message: 'Server is healthy' 
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'health_failed' });
  }
});

// User Registration
app.post('/api/users/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = req.body || {};

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: 'firstName, lastName, email, and password are required'
      });
    }

    if (confirmPassword && password !== confirmPassword) {
      return res.status(400).json({
        error: 'Passwords do not match'
      });
    }

    // Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        error: 'Email already in use'
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      passwordHash,
      role: 'admin'
    });

    // Generate JWT
    const token = jwt.sign(
      {
        sub: user._id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      userId: user._id.toString(),
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      error: 'Registration failed'
    });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password required' });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { 
        sub: user._id, 
        email: user.email, 
        role: user.role 
      }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );
    
    res.json({ 
      token,
      userId: user._id.toString(),
      user: { 
        id: user._id, 
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name || `${user.firstName} ${user.lastName}`,
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get Current User
app.get('/api/users/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.sub).select('-passwordHash');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name || `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Logout
app.post('/api/auth/logout', requireAuth, async (req, res) => {
  try {
    // In a JWT-based system, logout is mainly client-side
    // Server can optionally maintain a blacklist or revocation list
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Logout failed' });
  }
});

// ==================== ADMIN ROOM ROUTES ====================

// Get Room Summary (Admin)
app.get('/api/rooms/summary', requireAuth, async (req, res) => {
  try {
    const total = await Room.countDocuments();
    const booked = await Room.countDocuments({ isBooked: true });
    const available = total - booked;
    const rooms = await Room.find().sort({ number: 1 });
    
    res.json({
      hotel: hotelInfo,
      summary: { total, available, booked },
      rooms: rooms.map(r => ({
        id: r._id,
        mongoId: r._id,
        number: r.number,
        type: r.type,
        isBooked: r.isBooked,
        booking: r.booking || null,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      })),
    });
  } catch (e) {
    console.error('Error /api/rooms/summary:', e);
    res.status(500).json({ error: 'Failed to get summary' });
  }
});

// Get All Rooms (Admin)
app.get('/api/rooms', requireAuth, async (req, res) => {
  try {
    const rooms = await Room.find().sort({ number: 1 });
    
    res.json(rooms.map(r => ({
      id: r._id,
      mongoId: r._id,
      number: r.number,
      type: r.type,
      isBooked: r.isBooked,
      booking: r.booking || null,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    })));
  } catch (e) {
    console.error('Error /api/rooms:', e);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Get Single Room by ID (Admin)
app.get('/api/rooms/:roomId', requireAuth, async (req, res) => {
  try {
    const { roomId } = req.params;
    let room;
    
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    res.json({
      id: room._id,
      mongoId: room._id,
      number: room.number,
      type: room.type,
      isBooked: room.isBooked,
      booking: room.booking || null,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    });
  } catch (e) {
    console.error('Error /api/rooms/:roomId:', e);
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

// Book Any Available Room (Admin)
app.post('/api/rooms/book', requireAuth, async (req, res) => {
  try {
    const { guestName, guestEmail, fromDate, toDate, price, notes } = req.body || {};
    
    if (!guestName) {
      return res.status(400).json({ error: 'guestName is required' });
    }

    const room = await Room.findOne({ isBooked: false }).sort({ number: 1 });
    if (!room) {
      return res.status(409).json({ error: 'No available rooms' });
    }

    const calculatedPrice = price || calculatePrice(fromDate, toDate);

    room.isBooked = true;
    room.booking = { 
      guestName, 
      guestEmail: guestEmail || '', 
      fromDate, 
      toDate, 
      price: calculatedPrice, 
      notes 
    };
    await room.save();

    res.status(201).json({ 
      message: 'Room booked successfully', 
      room: {
        id: room._id,
        number: room.number,
        type: room.type,
        isBooked: room.isBooked,
        booking: room.booking,
      }
    });
  } catch (e) {
    console.error('Error /api/rooms/book:', e);
    res.status(500).json({ error: 'Failed to book room' });
  }
});

// Book Specific Room by ID (Admin)
app.post('/api/rooms/:roomId/book', requireAuth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { guestName, guestEmail, fromDate, toDate, price, notes } = req.body || {};
    
    if (!guestName) {
      return res.status(400).json({ error: 'guestName is required' });
    }

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    if (room.isBooked) {
      return res.status(409).json({ error: 'Room is already booked' });
    }

    const calculatedPrice = price || calculatePrice(fromDate, toDate);

    room.isBooked = true;
    room.booking = { 
      guestName, 
      guestEmail: guestEmail || '', 
      fromDate, 
      toDate, 
      price: calculatedPrice, 
      notes 
    };
    await room.save();

    res.status(201).json({ 
      message: 'Room booked successfully', 
      room: {
        id: room._id,
        number: room.number,
        type: room.type,
        isBooked: room.isBooked,
        booking: room.booking,
      }
    });
  } catch (e) {
    console.error('Error /api/rooms/:roomId/book:', e);
    res.status(500).json({ error: 'Failed to book room by id' });
  }
});

// Update Booking (Admin)
app.put('/api/rooms/:roomId', requireAuth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const updates = req.body || {};

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    if (!room.isBooked) {
      return res.status(409).json({ error: 'Room is not booked' });
    }

    // Merge updates into existing booking
    room.booking = { 
      ...room.booking?.toObject?.(), 
      ...updates 
    };
    
    await room.save();

    res.json({ 
      message: 'Booking updated successfully', 
      room: {
        id: room._id,
        number: room.number,
        type: room.type,
        isBooked: room.isBooked,
        booking: room.booking,
      }
    });
  } catch (e) {
    console.error('Error PUT /api/rooms/:roomId:', e);
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// Checkout Room (Admin)
app.delete('/api/rooms/:roomId/checkout', requireAuth, async (req, res) => {
  try {
    const { roomId } = req.params;

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    if (!room.isBooked) {
      return res.status(409).json({ error: 'Room is already available' });
    }

    room.isBooked = false;
    room.booking = undefined;
    await room.save();

    res.json({ 
      message: 'Checked out successfully', 
      room: {
        id: room._id,
        number: room.number,
        type: room.type,
        isBooked: room.isBooked,
      }
    });
  } catch (e) {
    console.error('Error DELETE /api/rooms/:roomId/checkout:', e);
    res.status(500).json({ error: 'Failed to checkout' });
  }
});

// ==================== CUSTOMER ROUTES (Protected) ====================

// Customer: Room Summary
app.get('/api/customer/rooms/summary', requireAuth, async (req, res) => {
  try {
    const total = await Room.countDocuments();
    const booked = await Room.countDocuments({ isBooked: true });
    const available = total - booked;
    const rooms = await Room.find().sort({ number: 1 });
    
    res.json({
      hotel: hotelInfo,
      summary: { total, available, booked },
      rooms: rooms.map(r => ({
        id: r._id,
        mongoId: r._id,
        number: r.number,
        type: r.type,
        isBooked: r.isBooked,
      })),
    });
  } catch (e) {
    console.error('Error /api/customer/rooms/summary:', e);
    res.status(500).json({ error: 'Failed to get customer summary' });
  }
});

// Customer: List Rooms
app.get('/api/customer/rooms', requireAuth, async (req, res) => {
  try {
    const rooms = await Room.find().sort({ number: 1 });
    
    res.json(rooms.map(r => ({
      id: r._id,
      mongoId: r._id,
      number: r.number,
      type: r.type,
      isBooked: r.isBooked,
    })));
  } catch (e) {
    console.error('Error /api/customer/rooms:', e);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Customer: Book Specific Room
app.post('/api/customer/rooms/:roomId/book', requireAuth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { fromDate, toDate, notes } = req.body || {};
    
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: 'fromDate and toDate are required' });
    }

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    if (room.isBooked) {
      return res.status(409).json({ error: 'Room is already booked' });
    }

    const price = calculatePrice(fromDate, toDate);
    
    room.isBooked = true;
    room.booking = { 
      guestName: req.user.email, 
      guestEmail: req.user.email,
      fromDate, 
      toDate, 
      price, 
      notes 
    };
    
    await room.save();
    
    res.status(201).json({ 
      message: 'Room booked successfully', 
      room: {
        id: room._id,
        number: room.number,
        type: room.type,
        isBooked: room.isBooked,
        booking: room.booking,
      }
    });
  } catch (e) {
    console.error('Error /api/customer/rooms/:roomId/book:', e);
    res.status(500).json({ error: 'Failed to book room' });
  }
});

// Customer: My Bookings (UPDATED)
app.get('/api/customer/my-bookings', requireAuth, async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) {
      return res.status(400).json({ error: 'Invalid user' });
    }
    
    // Search by both guestEmail and guestName for backward compatibility
    const rooms = await Room.find({ 
      isBooked: true, 
      $or: [
        { 'booking.guestEmail': email },
        { 'booking.guestName': email }
      ]
    }).sort({ number: 1 });
    
    const bookings = rooms.map(r => ({
      id: r._id,
      mongoId: r._id,
      roomNumber: r.number,
      type: r.type,
      fromDate: r.booking?.fromDate,
      toDate: r.booking?.toDate,
      price: r.booking?.price,
      notes: r.booking?.notes || '',
      guestName: r.booking?.guestName,
      guestEmail: r.booking?.guestEmail,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    }));
    
    res.json(bookings);
  } catch (e) {
    console.error('Error /api/customer/my-bookings:', e);
    res.status(500).json({ error: 'Failed to load bookings' });
  }
});

// ==================== PUBLIC ROUTES (No Auth) ====================

// Public: Room Summary
app.get('/api/public/rooms/summary', async (req, res) => {
  try {
    const total = await Room.countDocuments();
    const booked = await Room.countDocuments({ isBooked: true });
    const available = total - booked;
    const rooms = await Room.find().sort({ number: 1 });
    
    res.json({
      hotel: hotelInfo,
      summary: { total, available, booked },
      rooms: rooms.map(r => ({ 
        id: r._id, 
        number: r.number, 
        isBooked: r.isBooked, 
        type: r.type 
      })),
    });
  } catch (e) {
    console.error('Error /api/public/rooms/summary:', e);
    res.status(500).json({ error: 'Failed to get summary' });
  }
});

// Public: List Rooms
app.get('/api/public/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ number: 1 });
    
    res.json(rooms.map(r => ({ 
      id: r._id, 
      number: r.number, 
      isBooked: r.isBooked, 
      type: r.type 
    })));
  } catch (e) {
    console.error('Error /api/public/rooms:', e);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Public: Book Specific Room
app.post('/api/public/rooms/:roomId/book', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { guestName, guestEmail, fromDate, toDate, price, notes } = req.body || {};
    
    if (!guestName || !guestEmail) {
      return res.status(400).json({ error: 'guestName and guestEmail are required' });
    }

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    
    if (room.isBooked) {
      return res.status(409).json({ error: 'Room is already booked' });
    }

    const calculatedPrice = price || calculatePrice(fromDate, toDate);

    room.isBooked = true;
    room.booking = { 
      guestName, 
      guestEmail, 
      fromDate, 
      toDate, 
      price: calculatedPrice, 
      notes 
    };
    
    await room.save();

    res.status(201).json({ 
      message: 'Room booked successfully', 
      room: { 
        number: room.number, 
        isBooked: room.isBooked, 
        booking: room.booking 
      } 
    });
  } catch (e) {
    console.error('Error /api/public/rooms/:roomId/book:', e);
    res.status(500).json({ error: 'Failed to book room' });
  }
});

// Public: Book Multiple Rooms
app.post('/api/public/rooms/book-multiple', async (req, res) => {
  try {
    const { count, guestName, guestEmail, fromDate, toDate, notes } = req.body || {};
    const n = Math.max(1, Number(count || 1));
    
    if (!guestName || !guestEmail) {
      return res.status(400).json({ error: 'guestName and guestEmail are required' });
    }
    
    const rooms = await Room.find({ isBooked: false }).sort({ number: 1 }).limit(n);
    
    if (rooms.length < n) {
      return res.status(409).json({ 
        error: `Only ${rooms.length} room(s) available` 
      });
    }

    const price = calculatePrice(fromDate, toDate);

    const booked = [];
    for (const r of rooms) {
      r.isBooked = true;
      r.booking = { 
        guestName, 
        guestEmail, 
        fromDate, 
        toDate, 
        price, 
        notes 
      };
      await r.save();
      booked.push({ 
        number: r.number, 
        booking: r.booking 
      });
    }
    
    res.status(201).json({ 
      message: 'Rooms booked successfully', 
      count: booked.length, 
      booked 
    });
  } catch (e) {
    console.error('Error /api/public/rooms/book-multiple:', e);
    res.status(500).json({ error: 'Failed to book multiple rooms' });
  }
});

// ==================== DATABASE CONNECTION & SERVER START ====================

async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    });

    console.log("✅ MongoDB Connected Successfully");
    await seedRoomsIfNeeded();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
}

connectDB();