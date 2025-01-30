const mongoose = require("mongoose");
const eduaction = new mongoose.Schema({
    college:{
        type:String,
    },
    course:{
        type:String,
    },
    date:{
        type:Date,
    },
    grade:{
        type:Number
    }
});
module.exports = mongoose.model('Education', education);