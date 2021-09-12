const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const postRouter = require("./routers/post.router");
const authRouter = require("./routers/auth.router");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
app.use("/posts", postRouter);
app.use("/auth", authRouter);
connectDB();
app.listen(PORT, () => console.log(`listen on port ${PORT}`));
