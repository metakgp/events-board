const express=require("express")
const router=express.Router();
const Event=require("../models/Event")
router.post("/add",async (req,res)=>{
const {title,description,date,posterurl,time}=req.body;

try{
   const event= await Event.create({
        title,
        description,
        posterurl,
        date,
        time,
    })
    await event.save();
   return res.json({message:"ok"})

}
catch(err){
    res.json({message:"error"})
}


})





module.exports=router;