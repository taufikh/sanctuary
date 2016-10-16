/**
 * S5S Sanctuary map
 *
 * @license GPL-3.0
 */

// TODO: These test positions
//       should be moved into a unit test?
var THIS_POSITION = 0;

var TEST_POSITIONS = [
    {'coords': {'latitude': 40.698823, 'longitude': -73.976212}},
    {'coords': {'latitude': 40.698732, 'longitude': -73.976453}},
    {'coords': {'latitude': 40.698602, 'longitude': -73.976689}},
    {'coords': {'latitude': 40.698696, 'longitude': -73.976877}},
    {'coords': {'latitude': 40.698867, 'longitude': -73.977049}},
    {'coords': {'latitude': 40.698867, 'longitude': -73.977049}},
    {'coords': {'latitude': 40.698968, 'longitude': -73.977514}},
    {'coords': {'latitude': 40.699078, 'longitude': -73.977965}},
    {'coords': {'latitude': 40.699338, 'longitude': -73.978222}},
    {'coords': {'latitude': 40.699582, 'longitude': -73.978479}},
    {'coords': {'latitude': 40.699712, 'longitude': -73.978983}},
    {'coords': {'latitude': 40.699720, 'longitude': -73.979498}},
    {'coords': {'latitude': 40.699687, 'longitude': -73.979981}},
    {'coords': {'latitude': 40.699768, 'longitude': -73.980560}},
    {'coords': {'latitude': 40.699768, 'longitude': -73.981043}},
    {'coords': {'latitude': 40.699817, 'longitude': -73.981687}},
    {'coords': {'latitude': 40.699801, 'longitude': -73.982041}},
    {'coords': {'latitude': 40.699817, 'longitude': -73.982374}},
    {'coords': {'latitude': 40.699850, 'longitude': -73.982916}},
    {'coords': {'latitude': 40.699862, 'longitude': -73.983318}},
    {'coords': {'latitude': 40.699854, 'longitude': -73.983822}},
    {'coords': {'latitude': 40.699854, 'longitude': -73.984289}}];

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
     * Nearby people.
     *
     * @type {Object}
     */
    var neighbor_markers = {};

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
     * Collect and move markers for neighboring users.
     *
     * @param {Object} data
     */
    var updateMarker = function (data) {
        var this_neighbor = neighbor_markers[data['id']];
        if (undefined === this_neighbor) {
            this_neighbor = L.marker(data.latlng).addTo(map);
        } else {
            this_neighbor.setLatLng(data.latlng);
        }
        neighbor_markers[data['id']] = this_neighbor;
    };

    /**
     * Updates the marker for a single neighbor.
     *
     * @type {Object}
     */
    var updateNeighbor = function (neighbor) {
        var this_neighbor = neighbor_markers[neighbor['id']];
        if (undefined === this_neighbor) {
            var myIcon = L.divIcon({className: 'glyphicon glyphicon-user neighbor-marker'});
            this_neighbor = L.marker(neighbor.latlng, {
                icon : myIcon
            }).addTo(map);
        } else {
            this_neighbor.setLatLng(neighbor.latlng);
        }
        var t = document.getElementById('neighbor-popup');
        var html = '<p>I have: ' + neighbor['i_have'] + '<br/> </p>' + t.innerHTML;
        var popup = L.popup().setContent(html);
        this_neighbor.bindPopup(popup);
        neighbor_markers[neighbor['id']] = this_neighbor;
    };

    /**
     * Updates a block of neighbor data.
     *
     * @type {Array} data Of neihgbor objects.
     */
    var updateNeighbors = function (data) {
        data.forEach(function (neighbor) {
            updateNeighbor(neighbor);
        });
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
        if (THIS_POSITION > TEST_POSITIONS.length - 1) {
            THIS_POSITION = 0;
        }
    };

    /**
     * Do the thing!
     *
     * @callback
     */
    var init = function (socket) {
        var start_pos = [TEST_POSITIONS[0].coords.latitude, TEST_POSITIONS[0].coords.longitude];
        map = L.map('the-map').setView(start_pos, 16); // lat,lng of the Brooklyn Navy Yard
        map.attributionControl.setPrefix('');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'maxZoom': 19
        }).addTo(map);
        // Create a pin at the initial location
        my_marker = L.marker(start_pos).addTo(map);

        map.dragging.disable();

        // TODO: This geolocation has been faked for
        //       the demo. Use `.watchPosition()` for
        //       using real (live) movement data.
//        var watch_id = navigator.geolocation.watchPosition(
        var interval_id = setInterval(
                getNewPosition,
                1000,
                socket
//                function () {
//                    console.log('Could not get current location.');
//                },
//                { 'timeout': 5000 }
            );
    };

    return {
        'updateMarker': updateMarker,
        'updateNeighbors': updateNeighbors,
        'init': init
    };

})();

S5S_MAP.init(S5S_SOCKET.updateUser);
