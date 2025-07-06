const express = require("express");
const router = express.Router();
const multer = require("multer");
const Event = require("../models/Event");
const verifyToken = require("../utils/auth");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("poster"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

router.post("/add", verifyToken, async (req, res) => {
  const {
    title,
    description,
    date,
    posterurl,
    time,
    society,
    createdBy,
    selectedTags,
  } = req.body;

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
      createdBy,
      tags: selectedTags,
    });

    return res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/page/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    res.status(200).json(event);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/user", async (req, res) => {
  try {
    const { userMail } = req.body;

    const userEvents = await Event.find({ createdBy: userMail });
    res.status(200).json({ message: "ok", userEvents });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.patch(
  "/update/:id",
  upload.single("poster"),
  verifyToken,
  async (req, res) => {
    const { id } = req.params;
    const eventDetails = req.body;

    try {
      // Get the old event before updating
      if (!id) {
        return res.status(404).json({ message: "Event not found" });
      }
      const oldEvent = await Event.findById(id);
      if (!oldEvent) {
        return res.status(404).json({ message: "Event not found" });
      }

      let newPosterPath = oldEvent.posterurl;
      console.log("oldEvent.posterurl:", oldEvent.posterurl);

      const isNewPosterUploaded =
        eventDetails.posterurl && eventDetails.posterurl !== oldEvent.posterurl;

      // If a new file is uploaded, delete the old image and update path
      if (isNewPosterUploaded) {
        const absoluteOldPath = path.join(__dirname, "..", oldEvent.posterurl);

        if (fs.existsSync(absoluteOldPath)) {
          fs.unlinkSync(absoluteOldPath);
        } else {
          console.log("File not found:", absoluteOldPath);
        }
      }

      newPosterPath = eventDetails.posterurl;

      // update event in the database
      await Event.findByIdAndUpdate(id, {
        ...eventDetails,
        posterurl: newPosterPath,
      });

      res.json({ message: "ok" });
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Error updating event" });
    }
  },
);
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.json({ message: "Event not found " });
    }
    return res.json({ message: "ok" });
  } catch (err) {
    console.error("Error deleting event", err);
    return res.json({ message: "Internal Server Error" });
  }
});

module.exports = router;
