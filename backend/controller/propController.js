const Joi = require('joi');
const property = require('../models/property');
const propertyrequest = require('../models/propertyrequest');
const fs = require('fs');
const rentagreements = require('../models/rentagreements');
const BACKEND_SERVER_PATH = process.env.BACKEND_SERVER_PATH
const propController = {
    async getAll(req,res,next){
        // console.log('hi');
        const properties = await property.find({accepted : true,rented : false});
        res.status(200).json(properties);        
    },
    async getAllReqs(req,res,next){
        const properties = await property.find({accepted : false});
        res.status(200).json(properties);
    },
    async postProperty(req,res,next){

        const createPropSchema = Joi.object({
            rent : Joi.string().required(),
            owner : Joi.string().required(),
            photo : Joi.string().required()
        });
        
        const data = req.body;
        const {error} = createPropSchema.validate(data);
        if(error)
        {
            return next(error);
        }
        const {owner,rented,rent,photo} = data;
        const buffer  = Buffer.from(photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),'base64');
        
        //allot a random name.png
        const imagePath = `${Date.now()}-${owner}.png`;
         //save locally
         try{
            fs.writeFileSync(`storage/${imagePath}`,buffer)
        }
        catch(error)
        {
            // console.log(imagePath);
            return next(error);
        }
        let newProp;
        try{
            newProp = new property({
                owner,
                rented,
                rent,
                photoPath :`${BACKEND_SERVER_PATH}/storage/${imagePath}`
            });
            await newProp.save();
        }
        catch(error)
        {
            next(error);
        }
        res.status(201).json(newProp);        
    },
    async getById(req,res,next) {
        const getByIdSchema = Joi.object({
            id : Joi.string().required()
        })
        const {error} = getByIdSchema.validate(req.params);
        if(error)
        {
            return next(error);
        }
        let prop;
        const {id} = req.params;
        try{
            prop = await property.findById(id).populate('owner');
        }
        catch(error)
        {
            next(error);
        }
        return res.status(200).json({prop});
    },
    async acceptReq(req,res,next) {
        const acceptByIdSchema = Joi.object({
            id : Joi.string().required()
        })
        const {error} = acceptByIdSchema.validate(req.params);
        if(error)
        {
            return next(error);
        }
        let prop;
        const {id} = req.params;
        try{
            prop = await property.updateOne({_id : id},{accepted : true});   
        }
        catch(error)
        {
            next(error);
        }
        return res.status(201).json({prop});
    },
    async rejectReq(req,res,next){
        const acceptByIdSchema = Joi.object({
            id : Joi.string().required()
        })
        const {error} = acceptByIdSchema.validate(req.params);
        if(error)
        {
            return next(error);
        }
        let prop;
        const {id} = req.params;
        try{
            prop = await property.deleteOne({_id : id});
        }
        catch(error)
        {
            next(error);
        }
        return res.status(201).json({prop});
    },
    async rentProp(req,res,next){
        const data  = req.body;
        const {rentedBy,owner,propId} = data;
        let rented;
        try{
            rented = new rentagreements({
                propId,
                owner,
                rentedBy
            })
            rented.save();
            await property.updateOne({_id : propId},{rented : true});
        }
        catch(error)
        {
            return next(error);
        }
        res.status(200).json(rented);
    }
}
module.exports = propController