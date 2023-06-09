const Client = require("../models/Client");
const DailyLog = require("../models/DailyLog")
const Workout = require("../models/Workout")

module.exports = {
  getDailyLog: async (req, res) => {
    try {
        const dailyLog = await DailyLog.findById(req.params.id);
        const myClient = await Client.findOne(dailyLog.client)
        const workout = await Workout.find({dailyLog: req.params.id}).sort({ createdAt: "desc" }).lean();
        res.render('dailyLog.ejs', {dailyLog: dailyLog, myClient:myClient, workout: workout})
        console.log(myClient)
    } catch (err){
        console.log(err)
    }
    
  },  

  createDailyLog: async (req, res) => {
    try {
      await DailyLog.create({
        todayGoal: req.body.todayGoal,
        notes: req.body.notes,
        client: req.params.id,
      });
      console.log("Daily Log has been added!");
      res.redirect(`/client/${req.params.id}`);
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
      res.redirect(`/client/dailylog/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteWorkout: async (req, res) => {
    try {
      // Find post by id
      // Delete post from db
      const workout = await Workout.findById(req.params.id)
                      await workout.remove();   
      console.log("Deleted workout");
      console.log(req);
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
}
}
