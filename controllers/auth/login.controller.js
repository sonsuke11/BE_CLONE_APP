const Auth = require("../../models/auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const loginController = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({ message: "Missing username or password." });
  }
  try {
    const user = await Auth.findOne({ userName });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect userName or password." });
    }
    const match = await bcrypt.compare(password, user.password);
    console.log(match);
    if (!match) {
      return res
        .status(400)
        .json({ message: "Incorrect username or password." });
    }

    //all good
    const accessToken = jwt.sign(
      { userName: user._id },
      process.env.SECRET_KEY
    );
    res.json({
      message: "Login successfull ",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = loginController;
