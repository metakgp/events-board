const express = require("express");
require('dotenv').config({ path: '../.env' });
const router = express.Router();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const SECRET=process.env.JWT_SECRET||"secret";
const Society = require("../models/Society");
const User = require("../models/User");

//USER SIGNIN
router.post("/signin", async (req, res) => {




  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      return res.json({ message: "all fields required" });
    }

    const admin = await User.findOne({ mail, role: "admin" });
    if (admin) {
      const isAdmin=await bcrypt.compare(password,admin.password)
      if (isAdmin) {
        const token=await jwt.sign({mail,role:"admin"},SECRET,{expiresIn:'24h'});
        res.cookie("token",token,{
          httpOnly:true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        return res.json({ message: "ok"});
      } else {
        return res.json({ message: "Incorrect password" });
      }
    } else {
      const society = await Society.findOne({ mail });
      // console.log("this is the soc and password", society.password);
      if (!society) {
        return res.json({ message: "Society not registered" });
      }
      if (society.status === "accepted") {
        const isSoc= await bcrypt.compare(password,society.password)
        if (isSoc) {
          const token=await jwt.sign({mail,role:"society"},SECRET,{expiresIn:"24h"})
          res.cookie("token",token,{
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000,
          })
          return res.json({ message: "ok"});
        } else {
          return res.json({ message: " Incorrect password  " });
        }
      } else {
        return res.json({ message: "Society not approved " });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: " Internal server Error " });
  }
});


router.get("/me", (req, res) => {
  
  const token = req.cookies.token;
  
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, SECRET);
    return res.json(decoded);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/logout",(req,res)=>{
  res.clearCookie("token",{
httpOnly:true,


  })
  res.json({message:"logged out successfully"})
})

module.exports = router;
