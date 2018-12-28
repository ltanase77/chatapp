const path = require('path');
const http = require('http');
const express = require('express');
const socket = require('socket.io');
const publicPath = path.join(__dirname, '/../public')
const app = express();
var server = http.createServer(app);
var io = socket(server);

io.on('connection', function(socket) {
    console.log('new user connected');
    socket.on('disconnect', function() {
        console.log('Client has disconnected from server!');
    })
})

const port = process.env.PORT || 3000;

 app.use(express.static(publicPath));

 server.listen(port, function() {
     console.log(`Server started on port ${port}`);
 })