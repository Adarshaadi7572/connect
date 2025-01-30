const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        trim:true,
    },
    lastName: {
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
      type:String,
      required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:["professional", "Admin"]
    },
    picture:{
        type:String,
    },
    post:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }],
    connection:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    education:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Education'
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    volunteering:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Volunteer'
    },
    skills:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Skills'
    }
});
module.exports = mongoose.model("User", userSchema);