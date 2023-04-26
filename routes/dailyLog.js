const express = require("express");
const router = express.Router();
const dailyLogController = require("../controllers/dailyLog");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/:id", dailyLogController.getDailyLog)
router.post("/createDailyLog/:id", dailyLogController.createDailyLog);
router.post("/createWorkout/:id", dailyLogController.createWorkout)



module.exports = router;