const departmentData = require('./data/departments.js');

function getAll() {
    return departmentData.slice();
}

function getById(id) {
    for (const department of departmentData) {
        if (department.id === id) {
            return department;
        }
    }

    return null;
}

module.exports.getAll = getAll;
module.exports.getById = getById;