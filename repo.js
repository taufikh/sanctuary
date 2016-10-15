(()=>{
    var location_by_id = {};
    var ids_by_location = {};
    var state_by_id = {};

    // fake get_neighbors
    // actual logic: get previous neighbors, get new neighbors, return union
    module.exports.get_neighbors = (id, new_loc) => {
        return Object.keys(location_by_id).concat(id);
    }

    module.exports.remove = (id) => {
        var location = location_by_id[id];
        if (location) {
            var key = lkey(location);
            ids_by_location[key] = ids_by_location[key].filter(x => x != id);
            delete location_by_id[id];
        }
    }

    module.exports.update = (id, state) => {
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
})();
