var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);
app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('User has joined the connection!');

  socket.on('disconnect', function(){
    console.log("User has left the connection!");
  });

  socket.on('message', function(data){
    console.log(data.name + ": " + data.message);
    socket.broadcast.emit('message', data);
  });

  socket.on('keypress', function(data){
    console.log(data.name + " is typing...");
    socket.broadcast.emit('keypress', data);
  });

});
