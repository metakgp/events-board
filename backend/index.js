const express = require("express");
const app = express();
const eventRoute = require("./routes/event");
const societyRoute = require("./routes/society");
const userRoute = require("./routes/user");
const uploadRoutes = require("./routes/upload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const env = require("./utils/env");

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
const mongoose = require("mongoose");

const PORT = env.PORT;
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect(env.MONGO_URI).then(() => {
  console.log("mongodb connected");
});
app.use("/event", eventRoute);
app.use("/society", societyRoute);
app.use("/user", userRoute);
app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`app running in port ${PORT}`);
});
