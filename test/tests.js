var repo = require('../repo.js');


describe('Users map', () => {
    beforeEach(() => {
        repo.clear();
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
});
