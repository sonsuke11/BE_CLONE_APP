const jwt = require("jsonwebtoken");
const verify = async (req, res, next) => {
  const token = req.headers("Authorization");
  if (!token) {
    return res.status(400).json({ success: false, message: "You need signin" });
  }
  try {
    const decode = jwt.verify(token, "odsjflkdjsagni");
    req.username = decode;
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  return next();
};

module.exports = verify;
