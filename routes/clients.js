const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const clientController = require("../controllers/clients");
const dailyLogController = require("../controllers/dailyLog")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Client Routes - simplified for now
router.get("/:id", ensureAuth, clientController.getClient);

router.get("/dailylog/:id", ensureAuth, dailyLogController.getDailyLog);

router.post("/createClient", clientController.createClient);

router.put("/likePost/:id", clientController.likePost);

router.delete("/deleteDailyLog/:id", clientController.deleteDailyLog);

module.exports = router;
