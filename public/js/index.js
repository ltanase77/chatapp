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

socket.on('newLocationMessage', function(message) {
    const li = $("<li></li>");
    const a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li);
});

$("#message-form").on("submit", function(event) {
    event.preventDefault();
    socket.emit("createMessage", {
        from: "User",
        text: $("[name=message]").val(),
    }, function() {

    });
});

const locationBtn = $("#location");
locationBtn.on("click", function() {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by uour browser');
    }
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMsg', {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        });
    }, function() {
        alert('Unable to fetch your location');
    });
});

