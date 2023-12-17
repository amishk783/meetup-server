const multer = require("multer");
const moment = require("moment");
const Meetup = require("../Modals/Meetup");
const User = require("../Modals/User");
const uploadOnCloudinary = require("../util/cloudinary")

exports.postMeetup = async (req, res) => {
  console.log(req.file);

  try {
    const takenEmail = req.user.email; //req.user.email
    const { enteredName, enteredAddress, enteredDescription, date } = req.body;

    // console.log(date);
    // const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    const imageLocalPath = req.file.path;
    console.log(imageLocalPath);
   
    const uploadImage = await uploadOnCloudinary(imageLocalPath);
    console.log(uploadImage);
   
    const url = uploadImage.secure_url;

    if (takenEmail) {
      // console.log(url + 99);
      const user = await User.findOne({ where: { email: takenEmail } });
      const meetup = await user.createMeetup({
        name: enteredName,
        address: enteredAddress,
        description: enteredDescription,
        image: url,
        date: "22/7/35",
      });
      console.log("created meetup successfully");
      res.status(200).json({ message: "Meetup created successfully",meetup });
    }
  } catch (error) {
    // console.log(error)
  }
};

exports.getUserMeetups = async (req, res) => {
  try {
    console.log(req.user.email);
    const user = await User.findOne({ where: { email: req.user.email } });
    const meetup = await user.getMeetups();

    console.log(meetup);

    res.send({ message: "Succesfull", allmeetup: meetup });
  } catch (error) {
    console.log(error);
    res.status(500).json("messsage:Something went wrong");
  }
};
exports.getAllMeetups = async (req, res) => {
  
  try {
    // const user = await User.findOne({ where: { email: req.user.email } });
    const meetup = await Meetup.findAll();
    const sortedMeetup = meetup.sort();
    const top4Meetups = sortedMeetup.slice(0, 4);
    console.log(top4Meetups);
    res.status(200).send({ message: "found 3 meetup successfully", meetup:top4Meetups });
    
  } catch (error) {
    res.status(303).send("Something went wrong")
  }

};
