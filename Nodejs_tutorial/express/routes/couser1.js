const express = require("express");
const router = express.Router();
const Couser1 = require("../models/couser1");

router.get("/", async (req, res) => {
  const userfind = await Couser1.find();
  res.send(JSON.stringify(userfind));
});
router.get("/:id", async (req, res) => {
  const id = req.param.id;
  try {
    const saved = await Couser1.findById(id);
    res.status(200)(saved);
  } catch (err) {
    console.log("this is error", err);
  }
});
router.post("/", async (req, res) => {
  const couser = req.body;
  try {
    const newcouser = new Couser1(couser);
    console.log(newcouser);
    const savedcouser = await newcouser.save();
    res.send(JSON.stringify(savedcouser));
  } catch (err) {
    console.log("post is not save", err);
  }
});

module.exports = router;
