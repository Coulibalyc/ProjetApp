const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

dotenv.config();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const commandeRoutes = require("./routes/commandeRoutes");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/user", userRoutes);
app.use("/api/commandes", commandeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use("/api", reportRoutes);




// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
  });