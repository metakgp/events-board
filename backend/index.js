const express = require("express");
require("dotenv").config();
const app = express();
const eventRoute = require("./routes/event");
const societyRoute = require("./routes/society");
const userRoute = require("./routes/user");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://127.0.0.1:5173",
    credentials: true,
  }),
);
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/events")
  .then(() => {
    console.log("mongodb connected");
  });
app.use("/event", eventRoute);
app.use("/society", societyRoute);
app.use("/user", userRoute);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
