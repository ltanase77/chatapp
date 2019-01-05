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
    const formattedTime = moment(msg.createdAt).format('h:mm a');
    const template = $('#message-template').html();
    const html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime,
    });
    $('#messages').append(html);
    /* console.log('New message received', msg);
    const li = $("<li></li>");
    li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
    $("#messages").append(li); */
});

/* socket.emit('createMessage', {from: "Vlad", text: "Hello!"}, function(data) {
    console.log('Got it', data);
}); */

socket.on('newLocationMessage', function(message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = $('#location-template').html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime,
    });
    $('#messages').append(html);
    /* const li = $("<li></li>");
    const a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li); */
});

$("#message-form").on("submit", function(event) {
    event.preventDefault();
    let textBox = $("[name=message]");
    socket.emit("createMessage", {
        from: "User",
        text: textBox.val(),
    }, function() {
        textBox.val('');
    });
});

const locationBtn = $("#location");
locationBtn.on("click", function() {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by uour browser');
    }
    locationBtn.attr("disabled", "disabled").text('Sending Location ...');
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMsg', {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        });
        locationBtn.removeAttr("disabled").text('Send Location');
    }, function() {
        alert('Unable to fetch your location');
        locationBtn.removeAttr("disabled").text('Send Location');
    });
});

