const mongoose  = require('mongoose');
//const Room  = require('./room');
const {roomSchema} = require('./room');
const userSchema = mongoose.Schema({
    socket_id : {
        type:String,
    },
    room:[roomSchema]
})
module.exports.User = mongoose.model('User', userSchema);