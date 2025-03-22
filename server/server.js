const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./config/db"); // PostgreSQL connection
const routes = require("./routes/routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", routes);

// Health check route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
