(()=>{
    var location_by_id = {};
    var ids_by_location = {};
    var state_by_id = {};
    var fake_neighbors = [
        [40.698773, -73.974475], // new lab
        [40.697967, -73.977104], // across
        [40.697162, -73.976803], // back
        [40.697788, -73.975076], // near
        [40.698569, -73.981685], // nassau
        [40.698098, -73.983273], // gold street
        [40.700131, -73.983144], // upper gold street
        [40.697984, -73.984217], // duffer street
        [40.697284, -73.984238], // lower duffer
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
            return [];
        else
            return location_by_id[id]
                ? Object.keys(location_by_id)
                : Object.keys(location_by_id).concat(id);
    }

    module.exports.get_neighbors_data = (id) => {
        // lets fake it like there are some neighbors with information
        // and all
        if (should_fake){
            var id = 123;
            return fake_neighbors.map(x=>{
                return {
                    latlng: x,
                    i_have: 'popsicles',
                    i_need: 'milk',
                    id: id++
                };
            });
        }
        else{
            return Object.keys(state_by_id).map(x => state_by_id[x]);
        }
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
