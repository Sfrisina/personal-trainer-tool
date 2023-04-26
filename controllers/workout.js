const Client = require("../models/Client");
const Workout = require("../models/Workout")
const DailyLog = require("../models/DailyLog")

module.exports = {

  getWorkout: async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      const workout = await Workout.find({client: req.params.id}).sort({ createdAt: "desc" }).lean();
      const dailyLog = await DailyLog.find({client:req.params.id}).sort({createdAt: "desc"}).lean();
      res.render("dailyLog.ejs", { myClient: client, user: req.user, workout: workout, dailyLog:dailyLog });
      console.log(req)
    } catch (err) {
      console.log(err);
    }
  },
  createWorkout: async (req, res) => {
    try {
      await Workout.create({
        workout: req.body.workout,
        sets: req.body.sets,
        reps: req.body.reps,
        weight: req.body.weight,
        dailyLog: req.params.id,
      });
      console.log("Workout has been added!");
      res.redirect(`/client/dailylog/:id`);
    } catch (err) {
      console.log(err);
    }
  },
};
