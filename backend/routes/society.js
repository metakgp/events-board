const express = require("express");
const router = express.Router();
const Society = require("../models/Society");
const verifyToken = require("../utils/auth");

router.post("/create", async (req, res) => {
  try {
    const { name, mail, phone, description, status, password } = req.body;
    if (!name || !mail || !phone || !description || !password) {
      return res.json({ message: "All fields are required" });
    }

    const soc = await Society.findOne({ mail });
    if (soc) {
      return res.json({ message: "Society already exists" });
    }

    const society = new Society({
      name,
      mail,
      phone,
      description,
      status,
      password,
    });

    await society.save();

    return res.json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/pending", verifyToken, async (req, res) => {
  try {
    const pendingSocieties = await Society.find({ status: "pending" });
    return res.status(200).json({ message: "ok", pendingSocieties });
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal server error" });
  }
});

router.post("/approve", async (req, res) => {
  const { id } = req.body;

  try {
    const updatedSociety = await Society.findByIdAndUpdate(id, {
      status: "accepted",
    });

    if (!updatedSociety) {
      return res.json({ message: "Society not found" });
    }

    return res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/decline", async (req, res) => {
  const { id } = req.body;

  try {
    const updatedSociety = await Society.findByIdAndUpdate(id, {
      status: "rejected",
    });

    if (!updatedSociety) {
      return res.json({ message: "Society not found" });
    }

    return res.status(200).json({ message: "ok" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
