const cloudinary = require("../middleware/cloudinary");
const Client = require("../models/Client");
const Workout = require("../models/Workout")
const DailyLog = require("../models/DailyLog")

module.exports = {
  getProfile: async (req, res) => {
    try {
      const clients = await Client.find({ user: req.user.id });
      res.render("profile.ejs", { clients: clients, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const clients = await Client.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { clients: clients });
    } catch (err) {
      console.log(err);
    }
  },
  getClient: async (req, res) => {
    try {
      const client = await Client.findById(req.params.id);
      const workouts = await Workout.find({client: req.params.id}).sort({ createdAt: "desc" }).lean();
      const dailyLog = await DailyLog.find({client:req.params.id}).sort({createdAt: "desc"}).lean();
      res.render("client.ejs", { r_client: client, user: req.user, workouts: workouts, dailyLog:dailyLog });
      console.log(workouts)
    } catch (err) {
      console.log(err);
    }
  },
  createClient: async (req, res) => {
    try {
      console.log(req)
      await Client.create({
        name: req.body.name,
        goals: req.body.goals,
        user: req.user.id,
      });
      
      console.log("Client has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
