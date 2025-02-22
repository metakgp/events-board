const express = require("express");
const router = express.Router();
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
      if (password === admin.password) {
        return res.json({ message: "ok", role: "admin" });
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
        if (password === society.password) {
          return res.json({ message: "ok", role: "society" });
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
