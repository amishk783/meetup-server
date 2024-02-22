
const Meetup = require("../Modals/Meetup");
const User = require("../Modals/User");
const uploadOnCloudinary = require("../util/cloudinary");

exports.postMeetup = async (req, res) => {
  console.log(req.file);

  try {
    const takenEmail = req.user.email;
    const { enteredName, enteredAddress, enteredDescription, date } = req.body;

    const imageLocalPath = req.file.path;
    console.log(imageLocalPath);

    const uploadImage = await uploadOnCloudinary(imageLocalPath);
    console.log(uploadImage);

    const url = uploadImage.secure_url;

    if (takenEmail) {
      const user = await User.findOne({ where: { email: takenEmail } });
      const meetup = await user.createMeetup({
        name: enteredName,
        address: enteredAddress,
        description: enteredDescription,
        image: url,
        date: date,
      });
      console.log("created meetup successfully");
      res.status(200).json({ message: "Meetup created successfully", meetup });
    }
  } catch (error) {
    console.log("Error creating meetup", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    const meetups = await Meetup.findAll();
    const sortedMeetup = meetups.sort();
    const top4Meetups = sortedMeetup.slice(0, 4);

    res
      .status(200)
      .send({ message: "found 3 meetup successfully", meetup: top4Meetups });
  } catch (error) {
    res.status(303).send("Something went wrong");
  }
};
exports.getMeetup = async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body);
    const { id } = req.body;
    console.log(id);
    const meetup = await Meetup.findOne({ where: { id } });
    console.log(meetup);
    res
      .status(200)
      .send({ message: "found meetup successfully", meetup: meetup });
  } catch (error) {
    res.status(303).send("Something went wrong");
  }
};
exports.deleteMeetup = async (req, res) => {
  console.log(req.body);
  try {
    const meetupIdToDelete = req.body.id;
    console.log(meetupIdToDelete);
    const user = await User.findOne({ where: { email: req.user.email } });
    const meetups = await user.getMeetups();
    const meetupToDelete = await Meetup.findByPk(meetupIdToDelete);
    if (!meetupToDelete || meetups.length === 0) {
      return res.status(404).send({ message: "Meetup not found for deletion" });
    }
    console.log(meetupToDelete);

    await meetupToDelete.destroy();
    const updateMeetups = await user.getMeetups();
    res.status(200).send({ message: "Meetup deleted", meetups: updateMeetups });
  } catch (error) {
    console.log("Error deleting meetup" + error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
exports.editMeetup = async (req, res) => {
  const meetupIdToEdit = req.params.id;
  console.log(meetupIdToEdit);
  try {
    const { enteredName, enteredAddress, enteredDescription, date } = req.body;
    const imageLocalPath = req.file.path;
    console.log(imageLocalPath);
    const meetupToEdit = await Meetup.findByPk(meetupIdToEdit);
    if (!meetupToEdit) {
      res.status(404).send({ message: "Meetup not found" });
    }
    const uploadImage = await uploadOnCloudinary(imageLocalPath);
    const url = uploadImage.secure_url;
    meetupToEdit.name = enteredName;
    meetupToEdit.address = enteredAddress;
    meetupToEdit.description = enteredDescription;
    meetupToEdit.date = date;
    meetupToEdit.image = url;
    meetupToEdit.save();
    res.status(200).send({ message: "Meetup updated successfully" });
  } catch (error) {
    console.error("Error editing meetup:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
