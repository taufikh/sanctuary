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
    };

    var init = function () {
        socket = io();
    };

    return {
        'updateUser': updateUser,
        'init': init
    };
})();

S5S_SOCKET.init();
