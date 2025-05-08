const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: 'https://backend-api-1ouy.onrender.com', // Remplace par l'URL de ton frontend Render
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  app.use(cors(corsOptions));
app.use(express.json());
app.post('/test', (req, res) => {
    console.log("✅ Requête reçue sur /test");
    res.status(200).json({ message: "Ça fonctionne !" });
  });

app.get('/test', (req, res) => {
    res.status(200).json({ message: "GET /test fonctionne bien !" });
  });
  
  

// Routes
app.use('/api/users', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5050;


app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));


//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
