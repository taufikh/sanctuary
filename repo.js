(()=>{
    var location_by_id = {};
    var ids_by_location = {};
    var state_by_id = {};
    var fake_neighbors = [
        {id: 1,latlng: [40.698773, -73.974475], qty: 1, i_have: 'a boat, food', i_need: ''}, // new lab
        {id: 2,latlng: [40.697967, -73.977104], qty: 2, i_have: 'water, food', i_need: ''}, // across
        {id: 3,latlng: [40.697162, -73.976803], qty: 1, i_have: 'a boat, food', i_need: ''}, // back
        {id: 4,latlng: [40.697788, -73.975076], qty: 5, i_have: 'water, food', i_need: ''}, // near
        {id: 5,latlng: [40.698569, -73.981685], qty: 1, i_have: 'water, food', i_need: ''}, // nassau
        {id: 6,latlng: [40.698098, -73.983273], qty: 1, i_have: 'water, food', i_need: ''}, // gold street
        {id: 7,latlng: [40.700131, -73.983144], qty: 3, i_have: 'water, a boat', i_need: 'food'}, // upper gold street
        {id: 8,latlng: [40.697984, -73.984217], qty: 1, i_have: 'water', i_need: 'food'}, // duffer street
        {id: 9,latlng: [40.697284, -73.984238], qty: 2, i_have: 'water', i_need: 'food'}, // lower duffer
    ];
    var should_fake = false;

    module.exports.clear = () => {
        // clean up
        location_by_id = {};
        ids_by_location = {};
        state_by_id = {};
    }
    module.exports.set_fake = (state) => {
        should_fake = state;
    };
    // fake get_neighbors
    // actual logic: get previous neighbors, get new neighbors, return union
    module.exports.get_neighbor_ids = (id, new_loc) => {
        // lets fake it like there are no neighbors
        // so we don't send updates to anyone
        if (should_fake)
            return Object.keys(location_by_id).filter(x => x != id);
        else
            return location_by_id[id]
                ? Object.keys(location_by_id)
                : Object.keys(location_by_id).concat(id);
    }

    module.exports.get_neighbors_data = (id) => {
        var neighbors = Object.keys(state_by_id)
            .map(x => state_by_id[x])
            .filter(x => x.id != id);

        if (should_fake)
            return fake_neighbors.concat(neighbors);
        else
            return neighbors;
    }

    module.exports.remove = (id) => {
        var location = location_by_id[id];
        if (location) {
            var key = lkey(location);
            ids_by_location[key] = ids_by_location[key].filter(x => x != id);
            delete location_by_id[id];
            delete state_by_id[id];
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
        location_by_id[state.id] = state.latlng;
        state_by_id[state.id] = state;

        var key = lkey(state.latlng);
        ids_by_location[key] = (ids_by_location[key] || []).concat(state.id);
    }

    function lkey(location) {
        return location.join('x');
    }
})();
