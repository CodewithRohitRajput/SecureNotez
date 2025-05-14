require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Notes = require('../models/Notes');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "User already exists" });

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Only secure in production
  sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
  path: "/", // Accessible across all paths
  maxAge: 3600000,
});

    res.status(200).json({ message: "User registered" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await User.findOne({ email });
    if (!isUser) return res.status(401).json({ message: "User not registered" });

    const passMatch = await bcrypt.compare(password, isUser.password);
    if (!passMatch) return res.status(401).json({ message: "Password is wrong" });

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
   res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Only secure in production
  sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
  path: "/", // Accessible across all paths
  maxAge: 3600000,
});

    res.status(200).json({ message: "User logged in" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get('/securityCheck', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token found" });

  try {
    const decoded = jwt.verify(token, secret);
    res.status(200).json({ message: "Token valid" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.post('/logout', (req, res) => {  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    path: "/"
  });
  res.status(200).json({ message: "User logged out successfully" });
});

module.exports = router;
