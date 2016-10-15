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
     * Updates the main map.
     *
     * @param {Position} pos
     */
    var updateMapPosition = function (pos) {
        panMap([pos.coords.latitude, pos.coords.longitude]);
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
        map.dragging.disable();

        var watch_id = navigator.geolocation.watchPosition(
                updateMapPosition,
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
