const jwt=require("jsonwebtoken")
require('dotenv').config({path:'.././.env'});

const SECRET=process.env.JWT_SECRET||"secret";


const verifyToken=(req,res,next)=>{
const token=req.cookies.token;
if(!token){
return res.json({message:"Access denied"})

}    
try{
    const decoded=jwt.verify(token,SECRET);
    req.user=decoded;
  
    next();
}
catch(err){
return res.json({message:"invalid or expired token"})
}

}

module.exports=verifyToken;