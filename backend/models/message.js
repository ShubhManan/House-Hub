const mongoose = require('mongoose');
const {Schema} = mongoose;

const messageSchema =  new Schema({
    chat :{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Chat'
    },
    sender : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    receiver : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'        
    },
    content : {
        type : String,
        trim : true,
        required : true
    }
},{timestamps : true}
);

module.exports = mongoose.model('Message',messageSchema,'messages');