const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ref',
    }]
})
module.exports = mongoose.model('Notification', notificationSchema);