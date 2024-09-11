const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");

// router.get("/", auth, async (req, res) =>
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("courses");
    res.send(users);
  } catch (err) {
    console.log("this is error is not fetching ", err);
  }
});
// router.get("/", async (req, res) => {

// if (req.query) {
//   // greater then gt,lasthen  lt, gte lte

//     const user = await User.find({rollNO:{$gt:req.query.rollNO}})

//   const user = await User.find(addresses:{$in:["mohsin","india"]});
//   console.log(user)

//   const user = await User.find(name:{$in:["mohsin","india"]});
//   console.log(user)

//   // or operator used
//   const user = await User.find({$or:[{name:"mohsin"},{name:"india"}]});

// //   return res.send(user);
//    }
//   try {
//     const user = await User.find();
//     console.log(user);
//     res.send(user);
//   } catch (err) {
//     console.log("not found", err);
//   }
//   res.send("this is server get is on the browser");
// });

// get user  by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    console.log(user);
    return res.send(user);
  } catch (err) {
    console.log("error fetching user with id:", err);
  }
});
// router.post("/", async (req, res) => {
//   const user = req.body;
//   const newUser = new User(user);
//   try {
//     console.log(newUser);

//     const saveduser = await newUser.save();
//     res.send(JSON.stringify(saveduser));
//   } catch (err) {
//     console.log(err);
//     res.send("not saved");
//   }
//   console.log(user);

//   res.send("this is post server is on the brower");
// });

// sign up
router.post("/", async (req, res) => {
  // bcrypt an algorithm to store passwords by usinf HASHING
  const user = req.body;

  // validation
  const { error } = validate(user);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    // before save checks that if user exists or not on basis of email
    const dbUser = await User.findOne({ email: user.email });
    if (dbUser) {
      return res.send("User already exists");
    } else {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      // console.log("salt", salt);
      // console.log(user);
      // res.send(user);
      const newUser = new User(user);
      console.log(newUser);
      const savedUser = await newUser.save();
      return res.status(201).send(savedUser);
    }
  } catch (e) {
    console.log("error catching error", e);
    return res.send(e);
  }
});
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.send(
    "this is server get is on pakistan id param the browser" + req.params.id
  );
});

// router.put("/:id", async (req, res) => {
//   console.log(req.pUser.arams.id);

//   // validation

//   try {
//     let user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (user) {
//       bcrpt.user = req.body;
//       console.log(user);
//       bcrpt.res.send(user);
//     } else {
//       console.log("user not found");
//     }
//   } catch (err) {
//     console.log("error is here", err);
//     res.send(err);
//   }
//   res.send("this is put server is on the brower");
// });
// router.patch("/", (req, res) => {
//   res.send("this is patch server is on the brower");
// });

router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.params.id);

    res.send(user);
  } catch (err) {
    console.log("this is delete is not", err);
  }
  res.send("this is delete component ");
});

// couser saved in the system
router.put("/:id/:couserId", async (req, res) => {
  // console.log(req.User.arams.id);

  // validation
  console.log("PUT USER: ");

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      //   bcrpt.user = req.body;
      //   console.log(user);
      //   bcrpt.res.send(user);
      return res.status(404).send("user not found");
    }
    console.log(user);
    user.courses.push(req.params.couserId);
    const updateuser = await user.save();
    return res.status(200).send(updateuser);
  } catch (err) {
    console.log("error is here", err);
    return res.send(err);
  }
});

module.exports = router;
