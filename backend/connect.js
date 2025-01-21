const mongoose = require("mongoose");

// MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/expense-tracker"; // Replace with your database URL

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connection established successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the application if the connection fails
  }
};

module.exports = connectDB;
