const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  console.log(req.body);
  const token = req.header("x-auth-token");
  try {
    const verifed = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifed);
    next();
  } catch (error) {
    res.status(401).send("unauthorized");
  }
};

module.exports = auth;
