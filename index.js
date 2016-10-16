var repo = require('./repo');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

repo.set_fake(true);

app.use(express.static('bower_components'));
app.use(express.static('public'));
app.get('/', function(req, res){
    res.sendfile('index.html');
});
app.get('/admin', function(req, res){
    res.sendfile('admin.html');
});

console.log(repo);
io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
        repo.remove(socket.id);
    });
    socket.on('update_user', function(user) {
        console.log('update_user', user);
        if (!user.latlng) {
            console.log('malformed update_user', user);
            io.to(socket.id).emit('error', 'malformed update_user');
        }
        else {
            user.id = socket.id;
            neighbors = repo.get_neighbor_ids(socket.id, user);
            console.log('neighbors', neighbors);
            neighbors.reduce((acc, x) => {
                console.log('emitting to',x);
                io.to(x).emit('update_user', user);
            }, []);
            repo.update(user);
        }
    });
    socket.on('get_neighbors', function(){
        var neighbors = repo.get_neighbors_data(socket.id);
        io.to(socket.id).emit('neighbors', neighbors);
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
