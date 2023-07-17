const Chat = require('../models/chat')


const chatsController = {
    async fetch(req,res,next){
        const data  = req.body;
        const {prop} = data;
        let chat;
        try{
            chat = await Chat.find({
                prop
            });
            if(chat.length === 0)
            {
                chat = new Chat({
                    prop
                });
                chat.save();
            }
        }
        catch(error)
        {
            return next(error);
        }
        res.status(200).json(chat);
    }
}
module.exports = chatsController