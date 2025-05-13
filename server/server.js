const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/note');
const authRoutes = require('./routes/auth');
const port =  process.env.PORT || 3000;



mongoose.connect('mongodb://127.0.0.1:27017/secureNotes')
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.error("MongoDB Error");
})


app.use(cors({
  origin: 'https://securenotez-1.onrender.com',
  credentials: "include",
}));

app.use(express.json());
app.use(cookieParser());

app.use('/notes' , noteRoutes);
app.use('/user' , authRoutes);


app.listen( port , ()=>{
    console.log(`You are connected to port :  ${port}`);
})
