const bcrypt = require("bcrypt");

const User = require("../Modals/User");
const jwt = require('jsonwebtoken');

exports.postAddUser = async (req, res) => {
  const name = req.body.enteredName;
  const email = req.body.enteredEmail;
  const password = req.body.enteredPassword;
  console.log(email, password, name);
  let newHashPassword;
  const exisitingUser = await User.findOne({ where: { email } })
  if (exisitingUser) return res.status(409).json({ message: "user already exists" });
  const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name: name,
      email: email,
      password: hash,
    });
  const token = jwt.sign(
    { userid: user.id, username: name,email:email },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
   res.json({ message: "User created successfully", token });
  
};
exports.verifyUser = async (req, res) => {
  const email = req.body.enteredEmail;
  const password = req.body.enteredPassword;

  try {
    const user = await User.findOne({ where: { email } });
    if (user) {
      bcrypt
        .compare(password, user.password)
        .then((match) => {
          if (match) {
          
            const token = jwt.sign(
              { userid: user.id, username: user.name, email:user.email},
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );
            console.log(token);
            return res.status(200).json({ message: "successfull", token });  // implement logout middleware 
          } else {
            return res.status(204).json({ message: "Invalid Password" });
          }
        })
        .catch((err) => {
          console.log(err);
          res.json({ message: "failed" });
        });
    } else {
      return res.json({ message: "User not found" });
    }
  } catch (err) {
    return res.send({ message: "failed" });
  }

};


