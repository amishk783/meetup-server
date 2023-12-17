const express = require("express");
const verifyJWT =require("../middleware/verifyJWT")
const router = express.Router();
const meetupController = require("../Controllers/meetup");
const upload = require("../middleware/multer")

router.post("/add-meetup",verifyJWT,upload.single('image'),meetupController.postMeetup);
router.get("/get-meetup",verifyJWT, meetupController.getUserMeetups);
router.get('/get-all-meetups',meetupController.getAllMeetups)

module.exports = router;