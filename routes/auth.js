const express = require('express')

const router = express.Router();
const userController = require('../Controllers/user');



router.post("/add-user", userController.postAddUser);

router.post("/login", userController.verifyUser);


module.exports = router;