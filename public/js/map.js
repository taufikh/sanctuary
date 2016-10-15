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
     * Do the thing!
     */
    var init = function () {
        map = L.map('the-map').setView([40.6998871, -73.9771145], 13); // lat,lng of the Brooklyn Navy Yard
        map.attributionControl.setPrefix('');
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            'maxZoom': 19
        }).addTo(map);
    };

    return {
        'init': init
    };
})();

S5S_MAP.init();
