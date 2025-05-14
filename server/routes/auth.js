require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Notes = require('../models/Notes');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const secret = process.env.JWT_SECRET




router.post('/signup' , async(req,res)=>{
    const {username , email , password} = req.body;
    try{
        const userExist = await User.findOne({email});
        if(userExist) return res.status(400).json({message : "User already exist"});

        const hashPassword = await bcrypt.hash(password , 10);

        const newUser = await new User({username , email , password : hashPassword});

        await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Set token in cookie
 // In signup/login routes:
res.cookie("token", token, {
  httpOnly: true,
  secure: true, // MUST BE TRUE FOR RENDER (HTTPS)
  sameSite: "none", // REQUIRED for cross-origin cookies
  maxAge: 3600000, // 1 hour
  domain: ".onrender.com" // Allow cookies for all subdomains (*.onrender.com)
});

        res.status(200).json({message : "User registered" , token });

    }catch(err){
        console.log("Error in signup");
    }
})


router.post('/login' , async(req,res)=>{
    const {email , password} = req.body;
    try{
        const isUser = await User.findOne({email});
        if(!isUser) return res.status(401).json({message : " User not registered"});

        const passMatch = await bcrypt.compare(password , isUser.password);
        if(!passMatch) return res.status(401).json({message : "Password is wrong"});

      const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Set token in cookie
  // In signup/login routes:
res.cookie("token", token, {
  httpOnly: true,
  secure: true, // MUST BE TRUE FOR RENDER (HTTPS)
  sameSite: "none", // REQUIRED for cross-origin cookies
  maxAge: 3600000, // 1 hour
  domain: ".onrender.com" // Allow cookies for all subdomains (*.onrender.com)
});

        res.status(200).json({message : "User Logged In " , token});


    }catch(err){
        console.log("Logged in Error");
    }
})

  router.get('/securityCheck', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    
    res.cookie('token', token, {
  httpOnly: true,
  secure: false,
  sameSite: 'Lax',
  domain: '.onrender.com' 
});

    res.status(200).json({ message: "Token received, give access to user" });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});


router.post('/logout' , (req,res)=>{
res.clearCookie('token');
res.status(200).json({message : "User Logged out Successfully "})
  })

module.exports = router;
