const mongoose = require("mongoose");
const config = require("config");

const mongodbURI = config.get("mogodbURI");
const connectDB = async () => {
  try {
    await mongoose.connect(mongodbURI, {
      useNewUrlParser: true,
    });
    console.log("DB connected!!");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
