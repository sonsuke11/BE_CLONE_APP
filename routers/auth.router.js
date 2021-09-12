const express = require("express");
const registerController = require("../controllers/auth/register.controller");
const loginController = require("../controllers/auth/login.controller");
const router = express.Router();
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
