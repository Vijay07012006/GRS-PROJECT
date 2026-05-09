const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Routes
const adminRoutes = require('./routes/adminRoute');
const collegeRoutes = require('./routes/collageRoute');
const complaintRoutes = require('./routes/complaintRoute');
const complaintTypeRoutes = require('./routes/complaintTypeRoute');
const studentRoutes = require('./routes/studentRoute');
const forumRoutes = require('./routes/forumRoute');
const sessionRoutes = require('./routes/sessionRoutes');
const userLogRoutes = require('./routes/userLogRoute');

dotenv.config();

const app = express();

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ CORS
// ✅ CORS
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}));

// ✅ Routes
app.use('/api/admin', adminRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/complaint-type', complaintTypeRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/user-logs', userLogRoutes);

// ✅ Test Route
app.get('/', (req, res) => {
  res.send('Server running successfully ✅');
});

// ❌ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.url}`
  });
});

// ❌ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.message);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
});

module.exports = app;