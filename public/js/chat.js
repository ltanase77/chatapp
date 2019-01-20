const socket = io();

function scrollToBottom() {
    // Selectors
    const messages = $("#messages");
    const newMessage = messages.children("li:last-child");
    // Heights
    const clientHeight = messages.prop("clientHeight");
    const scrollTop = messages.prop("scrollTop");
    const scrollHeight = messages.prop("scrollHeight");
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function() {
    console.log("Connected to the server.");
    const params = $.deparam(window.location.search);
    socket.emit("join", params, function(error) {
        if (error) {
            alert(error);
            window.location.href = "/";
        } else {
            console.log("No error");
        }
    });
    /* socket.emit('createMessage', {
        from: "Zamol",
        text: "Hi! What's up guys!",
    }) */
});
socket.on("disconnect", function() {
    console.log("Disconnected from server!");
});

socket.on("updateUserList", function(users) {
    const ol = $("<ol></ol>");
    users.forEach(function(user) {
        ol.append($("<li></li>").text(user));
        $("#users").html(ol);
    });
});

socket.on("newMessage", function(msg) {
    const formattedTime = moment(msg.createdAt).format("h:mm a");
    const template = $("#message-template").html();
    const html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime,
    });
    $("#messages").append(html);
    scrollToBottom();
    /* console.log('New message received', msg);
    const li = $("<li></li>");
    li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
    $("#messages").append(li); */
});

/* socket.emit('createMessage', {from: "Vlad", text: "Hello!"}, function(data) {
    console.log('Got it', data);
}); */

socket.on("newLocationMessage", function(message) {
    const formattedTime = moment(message.createdAt).format("h:mm a");
    const template = $("#location-template").html();
    const html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime,
    });
    $("#messages").append(html);
    scrollToBottom();
    /* const li = $("<li></li>");
    const a = $('<a target="_blank">My Current Location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr("href", message.url);
    li.append(a);
    $("#messages").append(li); */
});

$("#message-form").on("submit", function(event) {
    event.preventDefault();
    const textBox = $("[name=message]");
    socket.emit(
        "createMessage",
        {
            text: textBox.val(),
        },
        function() {
            textBox.val("");
        }
    );
});

const locationBtn = $("#location");
locationBtn.on("click", function() {
    if (!navigator.geolocation) {
        return alert("Geolocation is not supported by uour browser");
    }
    locationBtn.attr("disabled", "disabled").text("Sending Location ...");
    navigator.geolocation.getCurrentPosition(
        function(position) {
            socket.emit("createLocationMsg", {
                lat: position.coords.latitude,
                long: position.coords.longitude,
            });
            locationBtn.removeAttr("disabled").text("Send Location");
        },
        function() {
            alert("Unable to fetch your location");
            locationBtn.removeAttr("disabled").text("Send Location");
        }
    );
});
