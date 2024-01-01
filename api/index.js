// Importing required modules
import express from "express"; // Express framework for building web applications
import mongoose from "mongoose"; // Mongoose for MongoDB database connection
import dotenv from "dotenv"; // dotenv for loading environment variables
import userRouter from "./routes/user.route.js"; // Custom user router
import authRouter from "./routes/auth.route.js"; // Custom auth router
dotenv.config(); // Loading environment variables from .env file

const app = express(); // Creating an instance of the Express application

// Connecting to MongoDB database
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

app.use(express.json()); // Using express.json() middleware for parsing JSON bodies of requests

// Using the custom user router for handling user-related routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
