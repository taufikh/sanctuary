/**
 * S5S Sanctuary map
 *
 * @license GPL-3.0
 */

/**
 * Module
 */
var S5S_SOCKET = (function () {

    /**
     * The Socket.io "socket" instance.
     */
    var socket;

    /**
     * Sends a message to the Socket.io server with my location.
     *
     * @param {Position} pos
     */
    var updateUser = function (pos) {
        socket.emit(
            'update_user',
            {
                'latlng': [
                    pos.coords.latitude, pos.coords.longitude
                ]
            }
        );
        getNeighbors();
    };

    var getNeighbors = function () {
        socket.emit('get_neighbors');
    };

    var init = function () {
        socket = io();
        getNeighbors();
        socket.on('update_user', function (data) {
            S5S_MAP.updateMarker(data);
        })
        socket.on('neighbors', function (data) {
            S5S_MAP.updateNeighbors(data);
        });
    };

    return {
        'updateUser': updateUser,
        'init': init
    };
})();

S5S_SOCKET.init();
