const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//User model
const User = require("./User.js");

// Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log("Connecting to MongoDB URI", process.env.MONGO_URI);
console.log("ENVIRONMENT", process.env.ENV);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Verify connection
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// helthcheck route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// API routes for get user data
app.get("/api/users", async (req, res) => {
  console.log("Fetching users");
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// API routes for create user
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", data: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// Listen to port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
