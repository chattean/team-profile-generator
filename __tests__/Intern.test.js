const Intern = require('../lib/Intern.js');

jest.mock('../lib/Intern.js');

test('create a Intern object', () => {
    const intern = new Intern('Rob');

    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(Number));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.role).toBe('Intern');
    expect(intern.school).toEqual(expect.any(String));
});