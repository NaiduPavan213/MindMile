const express = require("express");
const router = express.Router();

// Example protected data endpoint — requires auth middleware applied by server
router.get("/", (req, res) => {
  res.json({ message: "Protected data for user", userId: req.user });
});

module.exports = router;
