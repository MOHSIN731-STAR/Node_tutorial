const express = require("express");
const router = express.Router();
// import model
const Mobile = require("../models/mobile");

router.get("/", async (req, res) => {
  try {
    const getdata = await Mobile.find({ email: "nazila@gmail.com" });
    res.send(getdata);
  } catch (err) {
    console.log(err);
  }
});
// get by id
router.get("/:id", async (req, res) => {
  const findid = req.params.id;
  try {
    const getdata = await Mobile.findById(findid);
    res.send(getdata);
  } catch (err) {
    console.log("error fetching user with id:", err);
  }
});

router.post("/", async (req, res) => {
  const mobilebody = req.body;
  const newdata = new Mobile(mobilebody);
  try {
    const saveddata = await newdata.save();
    res.send(saveddata);
  } catch (err) {
    console.log("post is not save", err);
  }
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const newdata = await Mobile.findByIdAndUpdate(id, req.body, { new: true });

    res.send(newdata);
  } catch (e) {
    console.log("this is error not updata data", e);
  }
});
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedatat = await Mobile.findByIdAndDelete(id);
    res.send(deletedatat);
  } catch (e) {
    console.log("not deleted data", e);
  }
});

module.exports = router;
