const message = require('../models/message');

const messageController = {
    async create(req,res,next) {
        const data = req.body;
        const {chat,sender,receiver,content} = data;
        try{
            const newMessage  = new message({
                chat,sender,receiver,content
            });
            await newMessage.save();
        }
        catch(error)
        {
            return next(error);
        }
        res.status(201).json({message : 'message sent'});
    },

    async getAll(req,res,next){
        const data = req.body;
        const {chat} = data;
        let messages;
        try{
            messages = await message.find({
                chat
            });
        }
        catch(error)
        {
            return next(error);
        }
        res.status(200).json(messages);
    },
}
module.exports = messageController