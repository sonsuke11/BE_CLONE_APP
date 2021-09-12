const express = require("express");
const verify = require("../middleware/verify");
const Post = require("../models/post.model");
const route = express.Router();

route.get("/", verify, async (req, res) => {
  const posts = await Post.find().lean();
  if (posts.length === 0) {
    return res.status(404).json({ message: "No data" });
  }
  return res.status(200).json({ message: "successfull", data: posts });
});
route.post("/", verify, async (req, res) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(400).json({ message: "missing title" });
  }
  const post = new Post({ title, content });
  await post.save();
  return res.status(200).json({ message: "successfully" });
});
module.exports = route;
