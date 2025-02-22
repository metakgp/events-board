const express = require("express");
const router = express.Router();
const Society = require("../models/Society");

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

    const society = await Society.create({
      name,
      mail,
      phone,
      description,
      status,
      password,
    });

    return res.json({ message: "ok" }); 
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/pending", async (req, res) => {
  try {
    const societies = await Society.find({ status: "pending" });
    res.status(200).json(societies); 
  } catch (err) {
    console.log(err);
    res.json({ message: "Internal server error" });
  }
});

router.post("/approve", async (req, res) => {
  const { id } = req.body;

  try {
    const updatedSociety = await Society.findByIdAndUpdate(id, { status: "accepted" });

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
