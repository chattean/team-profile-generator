const Engineer = require('../lib/Engineer.js');

jest.mock('../lib/Engineer.js');

test('create a Engineer object', () => {
    const engineer = new Engineer('Rob');

    expect(engineer.name).toEqual(expect.any(String));
    expect(engineer.id).toEqual(expect.any(Number));
    expect(engineer.email).toEqual(expect.any(String));
    expect(engineer.role).toBe('Engineer');
    expect(engineer.github).toEqual(expect.any(String));
});