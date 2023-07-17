const mongoose = require('mongoose');

const {Schema} = mongoose;

const rentagreementSchema = new Schema({
    propId :{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Property'
    },
    owner : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
    rentedBy :{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'User'
    },
},{timestamps : true}
);

module.exports = mongoose.model('RentAgreement',rentagreementSchema, 'RentAgreements');
