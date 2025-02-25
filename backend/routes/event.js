const express = require("express");
const router = express.Router();
const multer = require("multer");
const Event = require("../models/Event");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("poster"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

  res.json({ imageUrl });
});

router.post("/add", async (req, res) => {
  const { title, description, date, posterurl, time, society, selectedTags } = req.body;

  try {
    if (
      !title ||
      !description ||
      !date ||
      !posterurl ||
      !time ||
      !society ||
      !selectedTags
    ) {
      return res.json({ message: "All fields are required" });
    }

    const event = await Event.create({
      title,
      description,
      posterurl,
      date,
      time,
      society,
      tags:selectedTags,
    });

    // console.log("i am in creating")

    return res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/page/:id", async (req, res) => {
  const { id } = req.params;

  // console.log("id",id)
  try {
    const event = await Event.findById(id);
    // console.log("event",event)

    res.status(200).json(event);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
