/**
 * S5S Sanctuary map
 *
 * @license GPL-3.0
 */

// TODO: These test positions
//       should be moved into a unit test?
var THIS_POSITION = 0;
var TEST_POSITIONS = [
    {
        'coords': {
            'latitude': 40.720653,
                'longitude': -74.0031909
        }
    },
    {
        'coords': {
            'latitude': 40.6892534,
            'longitude': -74.0466891
        }
    },
    {
        'coords': {
            'latitude': 40.6998871,
            'longitude': -73.9771145
        }
    }
];

/**
 * Module
 */
var S5S_MAP = (function () {

    /**
     * Leaflet Map object itself
     *
     * @type {Map}
     */
    var map;

    /**
     * My pin on the map. (Always be in the "center.")
     *
     * @type {Marker}
     */
    var my_marker;

    /**
     * Updates the main map.
     *
     * @param {Position} pos
     */
    var updateMap = function (pos) {
        var new_latlng = [pos.coords.latitude, pos.coords.longitude];
        panMap(new_latlng);
        my_marker.setLatLng(new_latlng);

    };

    /**
     * Recenters the map on the given coordinates.
     *
     * @param {Array} to
     */
    var panMap = function (to) {
        map.setView(to, map.getZoom(), {'animation': true});
    };

    /**
     * Watch movement.
     *
     * @callback
     */
    var getNewPosition = function (callback) {
        updateMap(TEST_POSITIONS[THIS_POSITION]);
        callback(TEST_POSITIONS[THIS_POSITION]);

        THIS_POSITION++;
        if (THIS_POSITION > 2) {
            THIS_POSITION = 0;
        }
    };

    /**
     * Do the thing!
     *
     * @callback
     */
    var init = function (socket) {
        map = L.map('the-map').setView([40.6998871, -73.9771145], 13); // lat,lng of the Brooklyn Navy Yard
        map.attributionControl.setPrefix('');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'maxZoom': 19
        }).addTo(map);
        // Create a pin at the initial location
        my_marker = L.marker([40.6998871, -73.9771145]).addTo(map);

        map.dragging.disable();

        // TODO: This geolocation has been faked for
        //       the demo. Use `.watchPosition()` for
        //       using real (live) movement data.
//        var watch_id = navigator.geolocation.watchPosition(
        var interval_id = setInterval(
                getNewPosition,
                5000,
                socket
//                function () {
//                    console.log('Could not get current location.');
//                },
//                { 'timeout': 5000 }
            );
    };

    return {
        'init': init
    };

})();

S5S_MAP.init(S5S_SOCKET.updateUser);
