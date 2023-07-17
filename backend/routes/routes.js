const express = require('express');
const app = express();
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');
const propController = require('../controller/propController')
const messageController = require('../controller/messageController');
const chatsController = require('../controller/chatsController');


router.get('/test',(req,res)=>{
    res.json({msg:'routes working!!!'})
})

//auth related routes
router.post('/register', authController.register);
router.post('/login',authController.login);
router.post('/logout',auth,authController.logout);
router.get('/refresh',authController.refresh);


//properties
//get all the properties
router.get('/property/all',auth,propController.getAll);
router.post('/property',auth,propController.postProperty);
router.get('/property/:id',auth,propController.getById);
router.post('/property/rent',auth,propController.rentProp);

router.get('/admin/requestproperty',auth,propController.getAllReqs);
router.post('/admin/requestproperty/accept/:id',auth,propController.acceptReq);
router.post('/admin/requestproperty/reject/:id',auth,propController.rejectReq);

//messages
router.post('/message',auth,messageController.create);
router.post('/message/all',auth,messageController.getAll);

//chats
router.post('/chats',auth,chatsController.fetch);

module.exports =router