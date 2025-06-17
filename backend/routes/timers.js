const express = require("express");
const router = express.Router();
const Timer = require("../models/Timer");

// Get all timers
router.get("/", async (req, res) => {
  try {
    const timers = await Timer.find().sort({ targetDate: 1 });
    res.json(timers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new timer
router.post("/", async (req, res) => {
  const timer = new Timer({
    title: req.body.title,
    targetDate: req.body.targetDate,
    description: req.body.description,
  });

  try {
    const newTimer = await timer.save();
    res.status(201).json(newTimer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a timer
router.delete("/:id", async (req, res) => {
  try {
    await Timer.findByIdAndDelete(req.params.id);
    res.json({ message: "Timer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
