const mongoose = require('mongoose');
const {Schema} = mongoose;

const propertyrequestSchema = new Schema({
    owner : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    rented :{
        type : Boolean,
        default : false
    },
    photoPath : {
        type : String,
        required: true
    },
    rent : {
        type : String,
        required : true
    }
},{timestamps : true}
);
module.exports = mongoose.model('PropertyRequest',propertyrequestSchema,'propertyrequests');