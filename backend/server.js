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
// Allow a sensible local default so developers can run the backend without
// an existing .env. If you have a production/remote Mongo URI, set MONGO_URI
// in a .env file or environment variables.
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mindmile";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log(`MongoDB connection error : ${err.message}`);
    if (!process.env.MONGO_URI) {
      console.log(
        "Hint: MONGO_URI is not set in your environment. Create a backend/.env file with MONGO_URI or set the environment variable."
      );
    }
    process.exit(1);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
