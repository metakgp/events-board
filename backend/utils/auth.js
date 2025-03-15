const jwt=require("jsonwebtoken")
require('dotenv').config({path:'.././.env'});

const secretKey=process.env.JWT_SECRET||"secret";
const verifyToken=(req,res,next)=>{
const token=req.header("Authorization");
if(!token){
return res.json({message:"Access denied"})

}    
try{
    const decoded=jwt.verify(token.split(" ")[1],secretKey);
    req.user=decoded;
   
  
    next();
}
catch(err){
return res.json({message:"invalid or expired token"})
}

}

module.exports=verifyToken;