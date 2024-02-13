const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();
const meetupController = require("../Controllers/meetup");
const upload = require("../middleware/multer");

router.post(
  "/add-meetup",
  verifyJWT,
  upload.single("image"),
  meetupController.postMeetup
);
router.get("/get-meetups", verifyJWT, meetupController.getUserMeetups);
router.get("/get-all-meetups", meetupController.getAllMeetups);
// router.post('/get-meetup', verifyJWT, meetupController.getMeetup);
router.post("/get-meetup", meetupController.getMeetup);
router.post("/delete-meetup", verifyJWT, meetupController.deleteMeetup);
router.put(
  "/edit-meetup/:id",
  verifyJWT,
  upload.single("image"),
  meetupController.editMeetup
);

module.exports = router;
