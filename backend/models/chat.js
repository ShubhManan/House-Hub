const mongoose = require('mongoose');
const {Schema} = mongoose;

const chatSchema = new Schema ({
    prop : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Property'
    }
},{timestamps : true}
);

module.exports = mongoose.model('Chat',chatSchema,'chats');