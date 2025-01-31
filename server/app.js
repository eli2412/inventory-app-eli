require("dotenv").config(); // Load environment variables
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, "../dist")));

// Routes
app.use("/api/auth", require("./routes/auth")); // Add authentication routes
app.use("/api", require("./routes")); // Existing API routes

// 404 handler
app.use((req, res) => {
  res.status(404).send({ error: "404 - Not Found", message: "No route found for the requested URL" });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  res.status(500).send({ error: error.message });
});

module.exports = app;
