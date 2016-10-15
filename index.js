var repo = require('./repo');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('bower_components'));
app.use(express.static('public'));
app.get('/', function(req, res){
    res.sendfile('index.html');
});

console.log(repo);
io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
        repo.remove(socket.id);
    });
    socket.on('update_user', function(msg){
        console.log('update_user', msg);
        if (!msg.lat || !msg.long) {
            console.log('malformed update_user', msg);
            io.to(socket.id).emit('error', 'malformed update_user');
        }
        else {
            msg.id = socket.id;
            neighbors = repo.get_neighbors(socket.id, msg);
            console.log('neighbors', neighbors);
            neighbors.reduce((acc, x) => {
                console.log('emitting to',x);
                io.to(x).emit('update_user', msg);
            }, []);
            repo.update(socket.id, msg);
        }
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
