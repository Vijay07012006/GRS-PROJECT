const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

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

connectDB();

app.use(express.json());

// ✅ CORS - pehle rakho
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false  // '*' ke saath credentials false hona chahiye
}));

// ✅ OPTIONS preflight handle karo
app.options('*', cors());

app.use('/api/admin', adminRoutes);
app.use('/api/college', collegeRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/complaint-type', complaintTypeRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/user-logs', userLogRoutes);

app.get('/', (req, res) => {
  res.send('Server running successfully ✅');
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.url}` });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

module.exports = app;