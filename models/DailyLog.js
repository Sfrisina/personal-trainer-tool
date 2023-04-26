const mongoose = require("mongoose");

const DailyLogSchema = new mongoose.Schema({
  todayGoal: {
    type: String,
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
  notes: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("DailyLog", DailyLogSchema);