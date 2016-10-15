var socket = io();
$('form').submit(function(){
    socket.emit('update_user', {lat:40.689060, long:-74.044636});
    return false;
});
socket.on('update_user', function(msg){
    alert('user at\nlat:'+msg.lat+'\nlong:'+msg.long)
});
