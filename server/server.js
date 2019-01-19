const path = require("path");
const http = require("http");
const express = require("express");
const socket = require("socket.io");
const publicPath = path.join(__dirname, "/../public");
const {generateMessage, generateLocation} = require("./utils/message");
const {isRealString} = require("./utils/validation.js");
const {Users} = require("./utils/users.js");
const app = express();
const server = http.createServer(app);
const io = socket(server);
const users = new Users();

io.on("connection", function(socket) {
    console.log("New user connected");

    socket.on("join", function(params, callback) {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room are required!");
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        // socket.leave()
        io.to(params.room).emit("updateUserList", users.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app"));
        socket.broadcast
            .to(params.room)
            .emit("newMessage", generateMessage("Admin", `${params.name} has joined the chat`));
        callback();
    });

    socket.on("disconnect", function() {
        // console.log("Client has disconnected from server!");
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left!`));
        }
    });

    /* socket.emit('newMessage', {
        from: "Riddick",
        text: "Hi guys! Here I am again",
        createdAt: new Date(),
    }); */

    socket.on("createMessage", function(newMsg, callback) {
        console.log("createMessage", newMsg);
        io.emit("newMessage", generateMessage(newMsg.from, newMsg.text));
        callback();
        /* socket.broadcast.emit('newMessage',{
            from: newMsg.from,
            text: newMsg.text,
            createdAt: new Date().getTime(),
        }); */
    });

    socket.on("createLocationMsg", function(coords) {
        io.emit("newLocationMessage", generateLocation("Admin", coords.lat, coords.long));
    });
});

const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

server.listen(port, function() {
    console.log(`Server started on port ${port}`);
});
