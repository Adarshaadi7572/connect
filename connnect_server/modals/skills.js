const mongoose = require("mongoose");
const skills = new mongoose.Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User'
    },
    skill:{
        type:String,
    }

});
module.exports = mongoose.model('Skills', skills);