const mongoose = require('mongoose');
const {Schema} = mongoose;

const propertySchema = new Schema({
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
    },
    accepted : {
        type : Boolean,
        default : false
    }
},{timestamps : true}
);
module.exports = mongoose.model('Property',propertySchema,'properties');