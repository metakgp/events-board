const mongoose=require("mongoose")
const {Schema,model}=mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        required:false,
    },
    gmail:{
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

const User=model("user",UserSchema);
module.exports=User;