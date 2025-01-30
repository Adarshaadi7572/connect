const mongoose = require("mongoose");
const volunteer = new mongoose.Schema({
    user:{
           type:mongoose.Schema.Types.ObjectId,
           ref:'User'
    },
    role:{
        type:String,
    },
    organization:{
        type:String,
    },
    duration:{
        type:String,
    },
    field:{
        type:String,
    }
});
module.exports = mongoose.model('Volunteer', volunteer);