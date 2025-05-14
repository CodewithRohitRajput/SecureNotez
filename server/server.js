const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const noteRoutes = require('./routes/note');
const authRoutes = require('./routes/auth');

const port = process.env.PORT || 3000;

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "secureNotes"
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // In production, you might want to restrict this to specific origins
    const allowedOrigins = [
      'http://localhost:5173',  // Vite default development port
      'http://localhost:3000',  // Common React development port
      // 'https://securenotez.onrender.com',
      'https://securenotez-1.onrender.com',
    ];
    
    // For development allow all origins or check if origin is in allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(null, allowedOrigins[0]); 
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.set("trust proxy", 1);

app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Route verification middleware
app.use((req, res, next) => {
  console.log(`Incoming request to: ${req.path}`);
  next();
});


// Routes
app.use('/notes', noteRoutes);
app.use('/user', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Route Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
