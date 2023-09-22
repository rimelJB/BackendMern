const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../model/usermodel");
const bodyParser = require("body-parser");
require("dotenv").config({ path: "./config/.env" });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
const { registeration, login } = require("../middlewares/registration");
//POST :  REGISTER TO THE DATABASE
router.post("/user/register", registeration, async (req, res) => {
  const { name, email, password } = req.body;
  const searchUser = await users.findOne({ email }).exec();
  if (searchUser) {
    return res.status(401).json({ msg: "user already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.create({ name, email, password: hashedPassword }, (error) => {
    error
      ? res.send({ msg: "add user  server failed", error: error })
      : res.send({ msg: "add user server succed " });
  });
});

//POST :  LOGIN TO THE DATABASE
router.post("/user/login", login, async (req, res) => {
  try {
    const { email, password } = req.body;
    const searchUser = await users.findOne({ email }).exec();
    if (!searchUser) {
      res.status(401).json({ msg: "user does not exist" });
    }
    const checkPassword = await bcrypt.compare(password, searchUser.password);
console.log("checkPassword=",checkPassword);
    if (checkPassword) {
      const token = jwt.sign({ email }, process.env.tokenKey, {
        expiresIn: "240h",
      });
      console.log({ email }, process.env.tokenKey, { expiresIn: "240h" });
      console.log("token=", token);
      return res.json({ token });
    } else {
      return res.status(402).json({ msg: " wrong password" });
    }
  } catch (error) {
    return res.status(502).json({ msg: " login server failed" });
  }
});

//GET :  VERIFY TOKEN
router.get("/user/auth", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (token) {
      await jwt.verify(token, process.env.tokenKey);
      return res.status(200).json({ msg: "is authorized" });
    } else {
      res.status(403).json({ msg: "is not authorized" });
    }
  } catch {
    return res.status(404).json({ msg: "is not authorized" });
  }
});

//GET :  VERIFY TOKEN
// router.get("/user/auth",verifyToken,
// (req,res)=>{if (req.user) {
//    res.status(200)
//       .json({
//         message: "Congratulations! but there is no hidden content"
//       });
//   } else {
//     res.status(403)
//       .json({
//         message: "Unauthorised access"
//       })}})

module.exports = router;
