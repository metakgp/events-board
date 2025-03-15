const express = require("express");
require('dotenv').config({path:'.././.env'});
const router = express.Router();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const secretKey=process.env.JWT_SECRET||"secret";
const Society = require("../models/Society");
const User = require("../models/User");

//USER SIGNIN
router.post("/signin", async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.json({ message: "all fields required" });
    }

    const admin = await User.findOne({ mail, role: "admin" });
    // console.log("hi")
    // console.log(admin)
    if (admin) {
      const isAdmin=await  bcrypt.compare(password, admin.password)
      if (isAdmin) {
        const token=await jwt.sign({mail,role:"admin"},secretKey,{expiresIn:'24h'});
        console.log("hi bro this is my token ",token);
        return res.json({ message: "ok", token });
      } else {
        return res.json({ message: "Incorrect password" });
      }
    } else {
      const society = await Society.findOne({ mail });
      // console.log("this is the soc and password", society.password);
      if (!society) {
        return res.json({ message: "Society not registered" });
      }
      if (society.status === "accepted") {
        const isSoc= await bcrypt.compare(password,society.password)
        if (isSoc) {
          const token=await jwt.sign({mail,role:"society"},secretKey,{expiresIn:"24h"})
          return res.json({ message: "ok",token});
        } else {
          return res.json({ message: " Incorrect password  " });
        }
      } else {
        return res.json({ message: "Society not approved " });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: " Internal server Error " });
  }
});

module.exports = router;
