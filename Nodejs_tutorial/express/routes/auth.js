const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  // join:if invalid body return error
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  console.log(error);
  if (error) {
    console.log(error);
    return res.status(400).send({
      message: error.details[0].message,
      context: error.details[0].context,
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Incorrect email or password");
    }
    // console.log(user);
    const isValidPassword = await bcrypt.compare(password, user.password);

    ///////////////////////////////////////////////////////////

    if (isValidPassword) {
      const token = jwt.sign(
        { _id: user._id, name: user.name },
        process.env.JWT_SECRET
      );
      return res.status(200).send(token);
    } else return res.send("Invalid credentials");
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
});
module.exports = router;
