const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    pic:{
        type:String
    },
    email:{
        type:String
    },
    otp:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    },
    confirm_password:{
        type:String
    },
    emailToken:{
        type:String
    },
    isVerified:{
        default:false,
        type : Boolean
    },
    resetToken:String,
    expireToken:Date,
    date:{
        type:Date,
        default:Date.now()
    }
})

mongoose.model("Register",userSchema)