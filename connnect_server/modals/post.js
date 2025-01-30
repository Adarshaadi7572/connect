const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    description:{
        type:String,
    },
    picture:{
        type:String,
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
      }],
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Chat'
    }
});
module.exports = mongoose.model('Post', postSchema);