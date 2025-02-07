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

router.get("/pending",async (req,res)=>{
    try{
      const societies=await Society.find({status:"pending"})
    //  console.log(societies)
       res.json(societies)
      
    }
    catch(err){
      
    }
  })
router.post("/approve",async (req,res)=>{
  const {id}=req.body;
  await Society.findByIdAndUpdate(id,{status:"accepted"})
return res.json({message:"ok"});
  
})

module.exports=router;