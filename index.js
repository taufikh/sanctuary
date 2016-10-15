var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('bower_components'));
app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('update_user', function(msg){
    console.log(msg);
    io.emit('update_user', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
