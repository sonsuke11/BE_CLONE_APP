const Auth = require("../../models/auth.model.js");
const bcrypt = require("bcrypt");
const registerController = async (req, res) => {
  const { userName, password, confirmPassword } = req.body;
  const auth = await Auth.findOne({ userName });
  console.log(auth);
  if (auth) {
    return res.status(400).json({ message: "User name already exists" });
  }
  if (!userName || !password) {
    return res.status(400).json({ message: "Missing username or password " });
  }
  if (!confirmPassword) {
    return res.status(400).json({ message: "Confirm password is required" });
  }
  if (password && confirmPassword !== password) {
    return res
      .status(400)
      .json({ message: "Confirm password not match password" });
  }
  await bcrypt
    .hash(password, 10)
    .then(async (hashPassword) => {
      const newUser = new Auth({ userName, password: hashPassword });
      await newUser.save();
      return res.status(200).json({ message: "Register successfull" });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "register Failed" });
    });
};

module.exports = registerController;
