const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/grs_database';

const Admin = require('./model/Admin');

async function seed() {
  try {
    console.log('Connecting to database:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected!');

    // Check if admin exists
    const count = await Admin.countDocuments();
    if (count > 0) {
      console.log('Admin already exists in database. Fetching details...');
      const admin = await Admin.findOne({});
      console.log('Admin Email:', admin.email);
      console.log('Password is hashed in DB. If you want to reset, delete the document and run this script again.');
      process.exit(0);
    }

    const email = 'admin@gmail.com';
    const password = 'adminpassword';
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      email,
      password: hashedPassword
    });

    await newAdmin.save();
    console.log('Admin seeded successfully!');
    console.log('Email:', email);
    console.log('Password:', password);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err.message);
    process.exit(1);
  }
}

seed();
