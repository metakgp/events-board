const express=require("express")
const router=express.Router();
const multer=require("multer")
const Event=require("../models/Event")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
      cb(null,(file.originalname)); 
    },
  });
  
  const upload = multer({ storage });
  
 
  router.post("/upload", upload.single("poster"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
    
    res.json({ imageUrl });
  });




router.post("/add",async (req,res)=>{
const {title,description,date,posterurl,time,society,tags}=req.body;

try{
   const event= await Event.create({
        title,
        description,
        posterurl,
        date,
        time,
        society,
        tags,
       
    })
    console.log("i am in creating")
    await event.save();
   return res.json({message:"ok"})

}
catch(err){
    res.json({message:"error"})
}


})

router.get("/", async (req,res)=>{
    try{
        const events=await Event.find();
        res.json(events); 
    }
    catch (err){

    }

})

router.get("/page/:id",async (req,res)=>{
    const {id}=req.params;
    
    console.log("id",id)
    const event=await Event.findById(id);
    console.log("event",event)
    res.json(event)

})






module.exports=router;