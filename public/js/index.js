var socket = io();
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
    });