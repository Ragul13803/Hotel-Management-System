import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mongoose Model
const roomSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true, unique: true },
    type: { type: String, enum: ['AC', 'Non-AC'], default: 'AC' },
    isBooked: { type: Boolean, default: false },
    booking: {
      guestName: { type: String },
      fromDate: { type: Date },
      toDate: { type: Date },
      price: { type: Number },
      notes: { type: String },
    },
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);

// User model
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer', index: true },
  },
  { timestamps: true }
);
const User = mongoose.model('User', userSchema);

// App
const app = express();
// Strong CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.use(express.json());
// Serve static files but do NOT auto-serve index.html at '/'
app.use(express.static(path.join(__dirname, '..', 'frontend'), { index: false }));

// Config
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hotel_management';
const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

// Hotel info (static)
const hotelInfo = {
  name: 'Sample Hotel',
  totalRooms: 8,
  roomType: 'All AC',
  complementaryBreakfast: true,
  conditions: 'Seasonal days price may vary',
};

// Seed rooms if empty
async function seedRoomsIfNeeded() {
  const count = await Room.countDocuments();
  if (count === 0) {
    const rooms = Array.from({ length: 8 }, (_, i) => ({ number: i + 1, type: 'AC' }));
    await Room.insertMany(rooms);
    console.log('Seeded 8 AC rooms');
  }
}

// Connect DB and start server
async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { autoIndex: true });
    console.log('MongoDB connected');
    await seedRoomsIfNeeded();
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

// Routes
// Health check
app.get('/api/health', async (req, res) => {
  try {
    const mongoState = mongoose.connection.readyState; // 1 = connected
    const total = await Room.countDocuments().catch(() => -1);
    res.json({ ok: true, mongoState, totalRoomsInDb: total });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'health_failed' });
  }
});
// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password required' });
    const userRole = (role === 'admin' || role === 'customer') ? role : 'customer';
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already in use' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role: userRole });
    const token = jwt.sign({ sub: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

// Customer: list current user's bookings
app.get('/api/customer/my-bookings', requireAuth, async (req, res) => {
  try {
    const email = req.user?.email;
    if (!email) return res.status(400).json({ error: 'Invalid user' });
    const rooms = await Room.find({ isBooked: true, 'booking.guestName': email }).sort({ number: 1 });
    const items = rooms.map(r => ({
      id: r.number,
      mongoId: r._id,
      number: r.number,
      fromDate: r.booking?.fromDate,
      toDate: r.booking?.toDate,
      price: r.booking?.price,
      notes: r.booking?.notes || '',
      type: r.type,
    }));
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load bookings' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email, password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Missing token' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
// GET summary: total, available, booked counts + hotel info
app.get('/api/rooms/summary', async (req, res) => {
  try {
    console.log('GET /api/rooms/summary');
    const total = await Room.countDocuments();
    const booked = await Room.countDocuments({ isBooked: true });
    const available = total - booked;
    const rooms = await Room.find().sort({ number: 1 });
    res.json({
      hotel: hotelInfo,
      summary: { total, available, booked },
      rooms: rooms.map(r => ({
        id: r.number, // numeric room id for convenience
        mongoId: r._id,
        number: r.number,
        isBooked: r.isBooked,
        booking: r.booking || null,
        type: r.type,
      })),
    });
  } catch (e) {
    console.error('Error /api/rooms/summary', e);
    res.status(500).json({ error: 'Failed to get summary' });
  }
});

// POST book an available room
// body: { guestName, fromDate, toDate, price, notes }
app.post('/api/rooms/book', async (req, res) => {
  try {
    console.log('POST /api/rooms/book body=', req.body);
    const { guestName, fromDate, toDate, price, notes } = req.body || {};
    if (!guestName) return res.status(400).json({ error: 'guestName is required' });

    const room = await Room.findOne({ isBooked: false }).sort({ number: 1 });
    if (!room) return res.status(409).json({ error: 'No available rooms' });

    room.isBooked = true;
    room.booking = { guestName, fromDate, toDate, price, notes };
    await room.save();

    res.status(201).json({ message: 'Room booked', room });
  } catch (e) {
    console.error('Error /api/rooms/book', e);
    res.status(500).json({ error: 'Failed to book room' });
  }
});

// POST book a specific available room by roomId (numeric room number or Mongo _id)
// body: { guestName, fromDate, toDate, price, notes }
app.post('/api/rooms/:roomId/book', async (req, res) => {
  try {
    const { roomId } = req.params;
    console.log('POST /api/rooms/:roomId/book', roomId, 'body=', req.body);
    const { guestName, fromDate, toDate, price, notes } = req.body || {};
    if (!guestName) return res.status(400).json({ error: 'guestName is required' });

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }

    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (room.isBooked) return res.status(409).json({ error: 'Room is already booked' });

    room.isBooked = true;
    room.booking = { guestName, fromDate, toDate, price, notes };
    await room.save();

    res.status(201).json({ message: 'Room booked', room });
  } catch (e) {
    console.error('Error /api/rooms/:roomId/book', e);
    res.status(500).json({ error: 'Failed to book room by id' });
  }
});

// PUT update a booked room
// params: roomId (Mongo _id or room number if numeric)
// body: any of booking fields { guestName, fromDate, toDate, price, notes }
app.put('/api/rooms/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const updates = req.body || {};

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }

    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (!room.isBooked) return res.status(409).json({ error: 'Room is not booked' });

    room.booking = { ...room.booking?.toObject?.(), ...updates };
    await room.save();

    res.json({ message: 'Booking updated', room });
  } catch (e) {
    res.status(500).json({ error: 'Failed to update booking' });
  }
});

// DELETE checkout a room (free it)
app.delete('/api/rooms/:roomId/checkout', async (req, res) => {
  try {
    const { roomId } = req.params;

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }

    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (!room.isBooked) return res.status(409).json({ error: 'Room is already available' });

    room.isBooked = false;
    room.booking = undefined;
    await room.save();

    res.json({ message: 'Checked out successfully', room });
  } catch (e) {
    res.status(500).json({ error: 'Failed to checkout' });
  }
});

// Extra helpful endpoints for frontend/admin
app.get('/api/rooms', async (req, res) => {
  try {
    console.log('GET /api/rooms');
    const rooms = await Room.find().sort({ number: 1 });
    res.json(rooms);
  } catch (e) {
    console.error('Error /api/rooms', e);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

app.get('/api/rooms/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch room' });
  }
});

// ===== Public endpoints for customer portal (no auth) =====
// Summary
app.get('/api/public/rooms/summary', async (req, res) => {
  try {
    const total = await Room.countDocuments();
    const booked = await Room.countDocuments({ isBooked: true });
    const available = total - booked;
    const rooms = await Room.find().sort({ number: 1 });
    res.json({
      hotel: { ...hotelInfo, basePricePerDay: 5000 },
      summary: { total, available, booked },
      rooms: rooms.map(r => ({ id: r.number, number: r.number, isBooked: r.isBooked, type: r.type })),
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to get summary' });
  }
});

// List rooms
app.get('/api/public/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ number: 1 });
    res.json(rooms.map(r => ({ id: r.number, number: r.number, isBooked: r.isBooked, type: r.type })));
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Book one room by number or _id
app.post('/api/public/rooms/:roomId/book', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { guestName, fromDate, toDate, price, notes } = req.body || {};
    if (!guestName) return res.status(400).json({ error: 'guestName is required' });

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (room.isBooked) return res.status(409).json({ error: 'Room is already booked' });

    room.isBooked = true;
    room.booking = { guestName, fromDate, toDate, price, notes };
    await room.save();

    res.status(201).json({ message: 'Room booked', room: { number: room.number, isBooked: room.isBooked, booking: room.booking } });
  } catch (e) {
    res.status(500).json({ error: 'Failed to book room' });
  }
});

// Book multiple rooms (first N available)
app.post('/api/public/rooms/book-multiple', async (req, res) => {
  try {
    const { count, guestName, fromDate, toDate, notes } = req.body || {};
    const n = Math.max(1, Number(count || 1));
    if (!guestName) return res.status(400).json({ error: 'guestName is required' });
    const rooms = await Room.find({ isBooked: false }).sort({ number: 1 }).limit(n);
    if (rooms.length < n) return res.status(409).json({ error: `Only ${rooms.length} room(s) available` });

    const calcPrice = (fd, td) => {
      if (!fd || !td) return undefined;
      const d1 = new Date(fd), d2 = new Date(td);
      const days = Math.max(1, Math.ceil((d2 - d1) / (24*60*60*1000)));
      return days * 5000;
    };
    const price = calcPrice(fromDate, toDate);

    const booked = [];
    for (const r of rooms) {
      r.isBooked = true;
      r.booking = { guestName, fromDate, toDate, price, notes };
      await r.save();
      booked.push({ number: r.number, booking: r.booking });
    }
    res.status(201).json({ message: 'Rooms booked', count: booked.length, booked });
  } catch (e) {
    res.status(500).json({ error: 'Failed to book multiple rooms' });
  }
});
// ===== Customer-protected endpoints =====
// Base price and calculator (Rs. 5000/day; seasonal variation note only)
const PRICE_PER_DAY = 5000;
function calculatePrice(fromDate, toDate) {
  try {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (isNaN(from) || isNaN(to) || to <= from) return PRICE_PER_DAY; // default to 1 day
    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.ceil((to - from) / msPerDay);
    return days * PRICE_PER_DAY;
  } catch {
    return PRICE_PER_DAY;
  }
}

// Customer: summary with room availability
app.get('/api/customer/rooms/summary', requireAuth, async (req, res) => {
  try {
    const total = await Room.countDocuments();
    const booked = await Room.countDocuments({ isBooked: true });
    const available = total - booked;
    const rooms = await Room.find().sort({ number: 1 });
    res.json({
      hotel: { ...hotelInfo, basePricePerDay: PRICE_PER_DAY },
      summary: { total, available, booked },
      rooms: rooms.map(r => ({ id: r.number, mongoId: r._id, number: r.number, isBooked: r.isBooked, type: r.type })),
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to get customer summary' });
  }
});

// Customer: list rooms
app.get('/api/customer/rooms', requireAuth, async (req, res) => {
  try {
    const rooms = await Room.find().sort({ number: 1 });
    res.json(rooms.map(r => ({ id: r.number, mongoId: r._id, number: r.number, isBooked: r.isBooked, type: r.type })));
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Customer: book a specific available room
app.post('/api/customer/rooms/:roomId/book', requireAuth, async (req, res) => {
  try {
    const { roomId } = req.params;
    const { fromDate, toDate, notes } = req.body || {};
    if (!fromDate || !toDate) return res.status(400).json({ error: 'fromDate and toDate are required' });

    let room;
    if (/^\d+$/.test(roomId)) {
      room = await Room.findOne({ number: Number(roomId) });
    } else {
      room = await Room.findById(roomId);
    }
    if (!room) return res.status(404).json({ error: 'Room not found' });
    if (room.isBooked) return res.status(409).json({ error: 'Room is already booked' });

    const price = calculatePrice(fromDate, toDate);
    room.isBooked = true;
    room.booking = { guestName: req.user.email, fromDate, toDate, price, notes };
    await room.save();
    res.status(201).json({ message: 'Room booked', room });
  } catch (e) {
    res.status(500).json({ error: 'Failed to book room' });
  }
});

// Entry routes
app.get('/', (req, res) => {
  // Landing steps page
  res.sendFile(path.join(__dirname, '..', 'frontend', 'steps.html'));
});

app.get('/admin', (req, res) => {
  // Admin portal
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Fallback to frontend (kept for direct navigation to known pages)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

start();
