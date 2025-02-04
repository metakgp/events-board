const express = require("express");
const router = express.Router();
const Society = require("../models/Society");
const User = require("../models/User");

router.post("/signin", async (req, res) => {
  const { mail, password } = req.body;
  try {
    const admin = await User.findOne({ mail: mail, role: "admin" });
    if (admin) {
      if (password === admin.password) {
        return res.json({ message: "ok", role: "admin" });
      } else {
        return res.json({ message: "incorrect password" });
      }
    } else {
      const society = await Society.findOne({ mail: mail });
      console.log("this is the soc and password", society.password);
      if (!society) {
        return res.json({ message: "society not registered" });
      }
      if (society.status === "accepted") {
        if (password === society.password) {
          return res.json({ message: "ok", role: "society" });
        } else {
          return res.json({ message: "incorrect password" });
        }
      } else {
        return res.json({ message: "society not approved" });
      }
    }
  } catch (err) {
    console.log("something went wrong in signin");
  }
});

module.exports = router;
