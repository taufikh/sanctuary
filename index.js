var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('bower_components'));
app.use(express.static('public'));
app.get('/', function(req, res){
    res.sendfile('index.html');
});

var location_by_id = {};
var ids_by_location = {};
var state_by_id = {};

io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
        remove(socket.id);
    });
    socket.on('update_user', function(msg){
        console.log('update_user', msg);
        if (!msg.lat || !msg.long) {
            console.log('malformed update_user', msg);
            io.to(socket.id).emit('error', 'malformed update_user');
        }
        else {
            msg.id = socket.id;
            neighbors = get_neighbors(socket.id, msg);
            console.log('neighbors', neighbors);
            neighbors.reduce((acc, x) => {
                console.log('emitting to',x);
                io.to(x).emit('update_user', msg);
            }, []);
            update(socket.id, msg);
        }
    });
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

// fake get_neighbors
// actual logic: get previous neighbors, get new neighbors, return union
function get_neighbors(id, new_loc) {
    return Object.keys(location_by_id).concat(id);
}

function remove(id) {
    var location = location_by_id[id];
    if (location) {
        var key = lkey(location);
        ids_by_location[key] = ids_by_location[key].filter(x => x != id);
        delete location_by_id[id];
    }
}

function update(id, state) {
    var old_loc = location_by_id[id];
    // remove
    if (old_loc) {
        var key = lkey(old_loc);
        ids_by_location[key] = ids_by_location[key].filter(x => x != id);
    }

    // replace / set
    location_by_id[id] = {lat: state.lat, long: state.long};
    state_by_id[id] = state;

    var key = lkey(state);
    ids_by_location[key] = (ids_by_location[key] || []).concat(id);
}

function lkey(location) {
    return location.lat.toString() + 'x' + location.long.toString();
}
