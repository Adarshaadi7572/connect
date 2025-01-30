const mongoose = require("mongoose");
const project = new mongoose.Schema({
    user:{
           type:mongoose.Schema.Types.ObjectId,
           ref:'User'
    },
    name:{
        type:String,
    },
    duration:{
        type:Date,
    },
    description:{
        type:String,
    },
    link:{
        type:String,
    }
});
module.exports = mongoose.model('Project', project);