const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/:id", workoutController.getWorkout )
// router.post("/createWorkout/:id", workoutController.createWorkout);


module.exports = router;