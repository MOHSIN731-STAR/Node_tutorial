require("dotenv").config();
// mongoose import
const mongoose = require("mongoose");

const express = require("express");
const app = express();
app.use(express.json());
// router import
const couserrouter = require("./routes/couser");
const usersRouter = require("./routes/user");
const mobileRouter = require("./routes/mobile");
const login = require("./routes/auth");
const Couser1 = require("./routes/couser1");
app.use("/couser", couserrouter);
app.use("/user", usersRouter);
app.use("/mobile", mobileRouter);
app.use("/couser1", Couser1);
app.use("/auth", login);
app.use((req, res, next) => {
  console.log("this is middleware");
  if (req.body.name) {
    next();
  } else {
    return res.send("No body found");
  }
});
app.get("/", (req, res) => {
  res.send("hello world");
});
const connectString = process.env.MONGO_DB_URL;

mongoose
  .connect(connectString, {
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("Not connected to DB", err);
  });

// compass used connected with database
// const connectCompass =
//   "mongodb+srv://mohsinriazjmpr:123321@cluster0.x9a2d.mongodb.net/mongodb://localhost:27017";
// mongoose
//   .connect(connectCompass, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("connected with compass");
//   })
//   .catch((err) => {
//     console.log("not connected with compass", err);
//   });

app.listen(process.env.PORT, (req, res) => {
  console.log("this server is one/", process.env.PORT);
});
