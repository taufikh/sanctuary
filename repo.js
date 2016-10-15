(()=>{
    var location_by_id = {};
    var ids_by_location = {};
    var state_by_id = {};

    // fake get_neighbors
    // actual logic: get previous neighbors, get new neighbors, return union
    module.exports.get_neighbors = (id, new_loc) => {
        return location_by_id[id]
            ? Object.keys(location_by_id)
            : Object.keys(location_by_id).concat(id);
    }

    module.exports.get_neighors_data = (loc) => {
        return Object.keys(state_by_id).map(x => state_by_id[x]);
    }

    module.exports.remove = (id) => {
        var location = location_by_id[id];
        if (location) {
            var key = lkey(location);
            ids_by_location[key] = ids_by_location[key].filter(x => x != id);
            delete location_by_id[id];
        }
    }

    module.exports.update = (state) => {
        var old_loc = location_by_id[state.id];
        // remove
        if (old_loc) {
            var key = lkey(old_loc);
            ids_by_location[key] = ids_by_location[key].filter(x => x != state.id);
        }

        // replace / set
        location_by_id[state.id] = {lat: state.lat, long: state.long};
        state_by_id[state.id] = state;

        var key = lkey(state);
        ids_by_location[key] = (ids_by_location[key] || []).concat(state.id);
    }

    function lkey(location) {
        return location.lat.toString() + 'x' + location.long.toString();
    }
})();
