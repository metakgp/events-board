const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../utils/env");
const Society = require("../models/Society");
const User = require("../models/User");

const ADMIN_MAIL = env.ADMIN_MAIL
const ADMIN_PASSWORD = env.ADMIN_PASSWORD
const SECRET = env.JWT_SECRET;


router.post("/signin", async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.json({ message: "all fields required" });
    }
    if (mail === ADMIN_MAIL) {
      console.log("Trying to login as admin");
      
      if (password === ADMIN_PASSWORD) {
        const token = await jwt.sign({ mail, role: "admin" }, SECRET, {
          expiresIn: "24h",
        });
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        return res.json({ message: "ok" });
      } else {
        return res.json({ message: "Incorrect password" });
      }
    } else {
      const society = await Society.findOne({ mail });
      if (!society) {
        return res.json({ message: "Society not registered" });
      }
      if (society.status === "accepted") {
        const isSoc = await bcrypt.compare(password, society.password);
        if (isSoc) {
          const token = await jwt.sign({ mail, role: "society" }, SECRET, {
            expiresIn: "24h",
          });
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
          return res.json({ message: "ok" });
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

router.get("/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET);
    return res.json(decoded);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.json({ message: "logged out successfully" });
});

module.exports = router;
