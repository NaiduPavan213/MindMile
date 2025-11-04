const express = require("express");
const router = express.Router();

// Placeholder user routes to prevent module-not-found when starting the server.
// Replace with real implementations (register/login/profile, etc.).
router.get("/", (req, res) => {
  res.json({ message: "User routes placeholder" });
});

module.exports = router;
