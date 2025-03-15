const express=require("express");
require('dotenv').config({path:'../.env'});
const app=express();
const eventRoute=require("./routes/event")
const societyRoute=require("./routes/society")
const userRoute=require("./routes/user")
const cors = require('cors');

app.use(cors());
const mongoose=require("mongoose")

// console.log(process.env.lol);
const PORT=8000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI ||"mongodb://127.0.0.1:27017/events").then(()=>{console.log("mongodb connected")})
app.use("/event",eventRoute);
app.use("/society",societyRoute)
app.use("/user",userRoute);
app.use("/uploads", express.static("uploads"));

app.listen(PORT,()=>{
    console.log(`app running in port ${PORT}`)
})