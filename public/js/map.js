/**
 * S5S Sanctuary map
 *
 * @license GPL-3.0
 */

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
     * Do the thing!
     */
    var init = function () {
        map = L.map('the-map').setView([40.6998871, -73.9771145], 13); // lat,lng of the Brooklyn Navy Yard
        map.attributionControl.setPrefix('');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'maxZoom': 19
        }).addTo(map);
        // Create a pin at the initial location
        my_marker = L.marker([40.6998871, -73.9771145]).addTo(map);

        map.dragging.disable();

        var watch_id = navigator.geolocation.watchPosition(
                updateMap,
                function () {
                    console.log('Could not get current location.');
                },
                { 'timeout': 5000 }
            )
    };

    return {
        'init': init
    };

})();

S5S_MAP.init();
