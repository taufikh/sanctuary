var repo = require('../repo.js');


describe('Users map', () => {
    beforeEach(() => {
        repo.clear();
        repo.set_fake(false);
    });
    it('updates a user', () => {
        console.log('1');
        var user = {id: 1, latlng:[1.0,2.0], asd: 3};
        repo.update(user);
        var result = repo.get_neighbors_data(1);
        expect(JSON.stringify(result[0])).toBe(JSON.stringify(user))
    });
    it('clears the database between tests', () =>{
        console.log('2');
        var neighbors = repo.get_neighbors_data(12);
        expect(neighbors.length).toBe(0);
    });
    it('removes a user', () => {
       var user = {id: 1, latlng:[1.0,2.0], asd: 3};
        repo.update(user);
        var result = repo.get_neighbors_data(1);
        expect(JSON.stringify(result[0])).toBe(JSON.stringify(user))
        repo.remove(user.id);
        var neighbors = repo.get_neighbors_data(1);
        expect(neighbors.length).toBe(0);
    });
    it('fakes neighbors', () => {
        repo.set_fake(true);
        var result = repo.get_neighbor_ids(1);
        expect(result.length).toBe(0);
    });
    it('fakes neighbors data', () =>{
        repo.set_fake(true);
        var result = repo.get_neighbors_data(1);
        expect(result.length).toBe(9);

        var expected = {id: 123, latlng: [40.698773, -73.974475], i_have: 'popsicles', i_need: 'milk'};
        expect(JSON.stringify(result[0]), JSON.stringify(expected));
    });
});
