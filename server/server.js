const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const publicPath = path.join(__dirname, '/../public');
const {generateMessage} = require('./utils/message');
const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', function(socket) {
    console.log('New user connected');
    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app"));

    socket.broadcast.emit('newMessage', generateMessage("Admin", "New user joined the chat"));

    socket.on('disconnect', function() {
        console.log('Client has disconnected from server!');
    });

    /* socket.emit('newMessage', {
        from: "Riddick",
        text: "Hi guys! Here I am again",
        createdAt: new Date(),
    }); */

    socket.on('createMessage', function(newMsg) {
        console.log('createMessage', newMsg);
        io.emit('newMessage', generateMessage(newMsg.from, newMsg.text));
        /* socket.broadcast.emit('newMessage',{
            from: newMsg.from,
            text: newMsg.text,
            createdAt: new Date().getTime(),
        }); */
    });
});

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(port, function() {
    console.log(`Server started on port ${port}`);
});
