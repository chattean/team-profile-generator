const Manager = require('../lib/Manager.js');

jest.mock('../lib/Manager.js');

test('create a Manager object', () => {
    const manager = new Manager('Rob');

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(Number));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.role).toBe('Manager');
    expect(manager.officeNumber).toEqual(expect.any(Number));

});