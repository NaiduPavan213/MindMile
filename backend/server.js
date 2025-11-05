// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");
const auth = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// protect /api/data with auth middleware
app.use("/api/data", auth, dataRoutes);

const PORT = process.env.PORT || 5000;
// local fallback (use backend/.env to override)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mindmile";

const connectDB = async () => {
  try {
    // Newer drivers do not need deprecated options; keep connect minimal.
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(`MongoDB connection error : ${err.message}`);
    if (!process.env.MONGO_URI) {
      console.log(
        "Hint: MONGO_URI is not set in your environment. Create backend/.env with MONGO_URI or start a local mongod."
      );
    }
    // Throw so caller can decide (we choose to exit in startServer)
    throw err;
  }
};

// Start server only after DB connection succeeds to avoid buffering timeouts
const startServer = async () => {
  try {
    await connectDB();

    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server due to DB connection error:", err.message);
    process.exit(1);
  }
};

startServer();