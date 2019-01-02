const socket = io();
socket.on('connect', function() {
    console.log('Connected to the server.');
    /* socket.emit('createMessage', {
        from: "Zamol",
        text: "Hi! What's up guys!",
    }) */
});
socket.on('disconnect', function() {
    console.log('Disconnected from server!');
});

socket.on('newMessage', function(msg) {
    console.log('New message received', msg);
    const li = $("<li></li>");
    li.text(`${msg.from}: ${msg.text}`);
    $("#messages").append(li);
});

/* socket.emit('createMessage', {from: "Vlad", text: "Hello!"}, function(data) {
    console.log('Got it', data);
}); */

$("#message-form").on("submit", function(event) {
    event.preventDefault();
    socket.emit("createMessage", {
        from: "User",
        text: $("[name=message]").val(),
    }, function() {

    });
});
