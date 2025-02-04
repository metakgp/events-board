const express=require("express")
const router=express.Router();
const Society=require("../models/Society")
router.post("/create",async (req,res)=>{
    const {name,mail,phone,description,status,password}=req.body;
    // console.log("before save");
    try {
     
        const society=await Society.create({
            name,
            mail,
            phone,
            description,
            status,
            password,
        })
       
        await society.save();
        console.log("after save")
        return res.json({message:"ok"})
    }
    catch(err){

    }
})



module.exports=router;