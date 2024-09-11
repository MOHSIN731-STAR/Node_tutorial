const express = require("express");
const router = express.Router();
const Couser = require("../models/couser");
router.get("/", async (req, res) => {
  const userfind = await Couser.find();
  res.send(JSON.stringify(userfind));
});
router.post("/", async (req, res) => {
  const couser = req.body;
  try {
    const newcouser = new Couser(couser);
    console.log(newcouser);
    const savedcouser = await newcouser.save();
    res.send(JSON.stringify(savedcouser));
  } catch (err) {
    console.log("post is not save", err);
  }

  res.send("this is post server CouserApp Beautiful is on the brower");
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const Couserid = await Couser.findById(id);
  res.send(JSON.stringify(Couserid));
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const senddata = await Couser.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.sen(senddata);
  } catch (e) {
    console.log("this is error not updata data", e);
  }
  res.send("this is put server CouserApp Beautiful is on the brower");
});
router.patch("/", (req, res) => {
  res.send("this is patch server CouserApp Beautiful is on the brower");
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedata = await Couser.findByIdAndDelete(id);
    res.send(deletedata);
  } catch (e) {
    console.log("not deleted data", e);
  }
});

module.exports = router;
