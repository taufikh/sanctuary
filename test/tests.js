var repo = require('../repo.js');

describe('Users map', () => {
    it('updates a user', () => {
        var user = {id: 1, lat:1, long:2, asd: 3};
        repo.update(user);
        var result = repo.get_neighors_data(1);
        expect(JSON.stringify(result[0])).toBe(JSON.stringify(user))
    });
});
