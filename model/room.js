const mongoose  = require('mongoose');
const roomSchema = mongoose.Schema({
    room:String,
    messages:[]
})
module.exports = roomSchema;
const Room = mongoose.model('Room', roomSchema);
module.exports = Room;