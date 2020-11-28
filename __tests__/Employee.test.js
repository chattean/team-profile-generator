const Employee = require('../lib/Employee.js');


test('create a Employee object', () => {
    const employee = new Employee('Rob');

    expect(employee.name).toBe('Rob');
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
    expect(employee.role).toBe('Employee');
});