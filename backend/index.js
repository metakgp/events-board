const express=require("express");
const app=express();
const eventRoute=require("./routes/event")
const cors = require('cors');
app.use(cors());
const mongoose=require("mongoose")


const PORT=8000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/events").then(()=>{console.log("mongodb connected")})
app.use("/event",eventRoute);
app.use("/uploads", express.static("uploads"));

app.listen(PORT,()=>{
    console.log(`app running in port ${PORT}`)
})