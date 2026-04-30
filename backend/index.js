// backend/index.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const Routes = require("./routes/route.js");

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json({ limit: "10mb" }));

// ✅ CORS FIX (TEST MODE - OPEN FOR ALL)
app.use(cors({ origin: "*" }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Routes
app.use("/", Routes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server started at port no. ${PORT}`);
});