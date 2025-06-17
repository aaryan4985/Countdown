const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Timer", timerSchema);
