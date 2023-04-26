const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  workout: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
  },
  reps: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  dailyLog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'dailyLog'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Workout", WorkoutSchema);