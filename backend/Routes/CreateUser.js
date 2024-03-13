const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "thisismyjwtsecretstring#";
//signup user
router.post(
  "/createuser",
  [
    body("useremail", "Invalid email!").isEmail(),
    body("userpassword", "Incorrect password!").isLength({ min: 5 }),
    body("username", "Incorrect username!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.userpassword, salt);
    try {
      const newuser = await User.create({
        name: req.body.username,
        password: secpassword,
        email: req.body.useremail,
        location: req.body.userlocation,
      });
      res.json({ newuser, success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//login user
router.post(
  "/loginuser",
  [
    body("useremail", "Invalid email!").isEmail(),
    body("userpassword", "Incorrect password!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let email = req.body.useremail;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res.status(400).json({ errors: "User not registered!" });
      }
      const pwdcompare = await bcrypt.compare(
        req.body.userpassword,
        userdata.password
      );
      if (!pwdcompare) {
        return res.status(400).json({ errors: "User not registered!" });
      } else {
        const data = {
          user: {
            id: userdata.id,
          },
        };
        const authToken = jwt.sign(data, jwtSecret);
        return res.json({ success: true, authToken: authToken });
      }
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
module.exports = router;
