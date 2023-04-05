const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);// creating server using http, and using express only for request handling; 
const path = require('path');
const socketio = require('socket.io');// requiring socket.io
const io = socketio(server);// imbedding socket into http server;
app.use('/', express.static(path.join(__dirname, 'public')));
const user = {};
let connectedUsers = [];
io.on('connection', (socket)=>{
    socket.on('login',async (data)=>{
        const{username, room} = data;
        user[socket.id] = {username, room};// mapping the username and room with socket id;
        socket.join(room);
        connectedUsers.push({username:username, socket:socket.id, room:room});
        const connected = connectedUsers.filter(user => user.room === room);
        socket.to(room).emit('login-msg',{// io.emit will sends the data to all the sockets that are connected at that time;    
            data:{
                msg:`${user[socket.id].username} joined the chat `,
                name:user[socket.id].username,
                connected:connected
            }
        });
        socket.emit('login-msg',{// io.emit will sends the data to all the sockets that are connected at that time;    
            data:{
                msg:`${user[socket.id].username} joined the room. `,
                name:user[socket.id].username,
                room:room,
                connected:connected
            }
        });
    });
    socket.on('msg', data=>{
        const room = user[socket.id].room;
        const name = user[socket.id].username;
        socket.to(room).emit('received_message',{
            msg:data.msg,
            name:name
        })
        socket.emit('received_message',{
            msg:data.msg,
            name:name
        })
    })
    socket.on("disconnect", (reason) => {
        if(!user[socket.id]){
            return;
        }
        const connected = connectedUsers.filter(user => user.socket !== socket.id);
        connectedUsers = connected;
        const currRoom = user[socket.id].room;
        console.log(user[socket.id]);
        socket.to(currRoom).emit('dissconnected-msg',{// io.emit will sends the data to all the sockets that are connected at that time;
            connected:connected,
            name:user[socket.id].username
        });
      });
});
server.listen(3000, ()=>{
    console.log(`server started at port 3000`);
})
