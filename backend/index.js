const express = require('express');
const app = express();
const {PORT} = require('./config/index');
const dbConnect = require('./database/index');
const router  = require('./routes/routes');
const erroHandler =  require('./middleware/erroHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const corsOptions ={
    credentials : true,
    origin : ['http://localhost:3000']
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(router);

dbConnect();
app.get('/',(req,res)=>{
    res.json({msg : 'Hello world!'});
})
app.use('/storage',express.static('storage'));
app.use(erroHandler);

const server = app.listen(PORT,console.log('backend is running'));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    // socket.on("setup", (userData) => {
    //  socket.join(userData);
    //   console.log(userData + "joined");
    // });

    socket.on("join chat",(propId)=>{
      socket.join(propId);
      console.log(propId + " joined")
    })

    socket.on("new message sent",(data)=>{
      console.log(data.prop);
      const data2 = {
        sender  : data.sender,
        msg : data.msg
      }
      socket.in(data.prop).emit("message received",data2)
    })
  
  //   socket.on("join chat", (room) => {
  //     socket.join(room);
  //     console.log("User Joined Room: " + room);
  //   });
  
  //   socket.off("setup", () => {
  //     console.log("USER DISCONNECTED");
  //     socket.leave(userData._id);
  //   });
  });