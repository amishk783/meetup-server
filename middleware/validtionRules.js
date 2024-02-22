const { body } = require("express-validator");

const addSignupRules = [
  body("enteredName").isEmpty().isString().withMessage("Name is required"),
  body("enteredEmail")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("enteredPassword")
    .isEmpty()
    .withMessage("Password is required"),
];
module.exports = { addSignupRules };

const addLoginRules = [
  body("enteredEmail")
    .isEmail()
    .normalizeEmail()
    .withMessage("Please enter a valid email"),
  body("enteredPassword")
    .isEmpty()
    .isString()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];
module.exports = addLoginRules;
