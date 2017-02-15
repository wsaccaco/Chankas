var app = require('express')();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './public', 'index.html'));
});

io.on('connection', function(socket){
    io.emit('chat_message', {
        type : "new_connection",
        message: "nuevo usuario conectado"
    });

    socket.on("disconnect", function () {
        io.emit('chat_message', "Usuario se ha desconectado");
    });
    socket.on('chat_message', function(msg){
        io.emit('chat_message', msg);
    });
    socket.on('chat writer', function(msg){
        io.emit('chat writer', msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});