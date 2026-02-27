const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const Event = require("../models/Event");
const path= require("path")
router.post("/scrape-link", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }
  try {
    const scraperDir = path.join(__dirname, "../ig-scraper");
    // running the script 
    exec(`go run main.go "${url}"`, { cwd: scraperDir },async (error, stdout, stderr) => {
      if (error) {
        console.error(`Go Script Error: ${error.message}`);
        return res.status(500).json({ message: "Failed to fetch post details" });
      }

      const outputParts = stdout.split("===RESULT===\n");
      if (outputParts.length < 2) {
        return res.status(500).json({ message: "Could not parse scraper output" });
      }

      const scrapedData = JSON.parse(outputParts[1].trim());

       const defaultDate = new Date().toISOString().split('T')[0];
      const newEvent = await Event.create({
              title: "New Event yay ", 
              description: scrapedData.text || "No caption found",
              date: defaultDate,     
              posterurl: scrapedData.imageUrl || "",
              time: "12:00 PM",     
              society: "TBD", 
              tags: ["tech"],
            });

      return res.status(200).json({ 
        message: "Event created successfully", 
        event: newEvent 
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;