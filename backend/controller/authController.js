const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const JWTService = require('../services/JWTService');
const RefreshToken = require('../models/token');

const authController = {
    async register(req,res,next) {
        // res.status(201).json({'hii' : 'hello hi'});
        //1.validate user
        // console.log(req.body);
        const patt = /^[6-9]\d{9}$/
        const userRegisterSchema = Joi.object({
            name : Joi.string().min(3).max(30).required(),
            email : Joi.string().email().required(),
            password : Joi.string().min(3).max(10).required(),
            confirmPassword : Joi.ref('password'),
            phoneNumber : Joi.string().pattern(patt).required()
        })
        
        const data = req.body;
        const {error} = userRegisterSchema.validate(data);

        if(error)
        {
            return next(error);
        }
        const {name,email,password,phoneNumber} = data;
        try{
            const emailInUse =await User.exists({email});
            const phoneInUse = await User.exists({phoneNumber});
            if(emailInUse || phoneInUse)
            {
                const error = {
                    status : 409,
                    message : 'email or phone number already in use'
                }
                return next(error);
            }
        }
        catch(error)
        {
            console.log(error);
        }

        const hashedPassword = await bcrypt.hash(password,10);
        let userToRegister;
        let user;
        let accessToken;
        let refreshToken;
        try{
            userToRegister = new User({
            name : name ,
            email : email,
            password : hashedPassword,
            phoneNumber : phoneNumber  
        });
        user = await userToRegister.save();
        // console.log('hi');
        accessToken = JWTService.signAccessToken({_id: user._id,email:user.email},'30m');
        refreshToken = JWTService.signRefreshToken({_id:user._id},'60m');
        }
        catch(error)
        {
            return next(error);
        }
        await JWTService.storeRefreshToken(refreshToken,user._id);

        res.cookie('accessToken',accessToken,{
            maxAge : 1000*60*60*24,
            httpOnly : true
        })

        res.cookie('refreshToken',refreshToken,{
            maxAge : 1000*60*60*24,
            httpOnly : true
        })
        return res.status(201).json({user, auth : true});             
    },
    async login(req,res,next){
        const userLoginSchema = Joi.object({
            email : Joi.string().max(30).required(),
            password : Joi.string().min(3).max(10).required()
        })
        const data = req.body;
        const {error} = userLoginSchema.validate(data);
        let user ;
        const {email,password} = data;
        try{
            user = await User.findOne({email : email});
            if(!user)
            {
                const error = {
                    status : 401,
                    message : 'Invalid username or password'
                }
                return next(error);
            }
            const match= await bcrypt.compare(password,user.password);
            if(!match)
            {
                const error = {
                    status : 401,
                    message : 'invalid username or password'
                }
                return next(error);
            }
        }
        catch(error){
            
            return next(error);
        }
        const accessToken = JWTService.signAccessToken({ _id : user._id}, '30m');
        const refreshToken = JWTService.signRefreshToken({ _id : user._id},'60m');

        //update refreshtoken in database
        try{
            await RefreshToken.updateOne({
                _id : user._id
            },
            {token : refreshToken},
            {upsert:true});
        }
        catch(error)
        {
            return next(error);
        }

        res.cookie('accessToken',accessToken, {
            maxAge : 1000*60*60*24,
            httpOnly : true
        });

        res.cookie('refreshToken',refreshToken, {
            maxAge : 1000*60*60*24,
            httpOnly : true
        })    
        return res.status(200).json({user , auth : true});
    },
    async logout(req,res,next){
        const {refreshToken} = req.cookies;
        // console.log(refreshToken);
        try{
            await RefreshToken.deleteOne({token : refreshToken});
        }
        catch(error)
        {
            return next(error);
        }
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({user: null, auth:false});
    },
    async refresh(req,res,next){
        
        const originalRefreshToken = req.cookies.refreshToken;
        let id;
        try{
            id= JWTService.verifyRefreshToken(originalRefreshToken)._id;
        }
        catch(e)
        {
            const error = {
                 status : 401,
                 message : 'Unauthorized'
            }
            return next(error);
        }
        try{
            const match = RefreshToken.findOne({_id : id, token : originalRefreshToken});
            if(!match)
            {
                const error = {
                    status : 401,
                    message : 'Unauthorized'
                }
                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }
        try{
            const accessToken = JWTService.signAccessToken({_id : id},'30m');
            const refreshToken = JWTService.signRefreshToken({_id : id},'60m');
            RefreshToken.updateOne({_id : id},{token : refreshToken});
            res.cookie('accessToken',accessToken,{
                maxAge : 1000*60*60*24,
                httpOnly : true
            })
            res.cookie('refreshToken',refreshToken,{
                maxAge : 1000*60*60*24,
                httpOnly : true
            })
        }
        catch(error)
        {
            next(error);
        }
        const user = await User.findOne({_id : id});
        // const userDto = new UserDto(user);
        return res.status(200).json({user, auth : true});
    }
}
module.exports = authController;