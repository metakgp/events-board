const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const {Schema,model}=mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        required:false,
    },
    mail:{
        type:String,
    },
    password:{
        type:String,
    },
    
    role:{
        type:String,
        enum:['society','admin','user'],
        default:"user",
    }
    


})
UserSchema.pre("save",async function(next){
if(!this.isModified("password")) return next();
this.password= await bcrypt.hash(this.password,10)
next();
})



const User=model("user",UserSchema);
module.exports=User;