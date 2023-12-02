const staffData = require('./data/StaffDetails.js');

function getAll() {
    return staffData.slice();
}

function getById(id) {
    for (const staff of staffData) {
        if (staff.id === id) {
            return staff;
        }
    }

    return null;
}

function addStaff(staff) {
    staff.id = getNextId()
    
    staffData.push(staff);
}
function updateStaff(staff) {
    const { id, fullName, imageUrl, departmentId, phoneNumber, houseLot, street, suburb, postcode, state } = staff;
    const staffIndex = staffData.findIndex((s) => s.id === id);
    if (staffIndex !== -1) {
        staffData[staffIndex] = staff;
    
    } else {
        throw new Error('Staff member not found.');
    }
}

function getNextId() {
    const nextId = staffData.length > 0 ? Math.max(...staffData.map((staff) => staff.id)) + 1 : 1;
    return nextId;
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.addStaff = addStaff;
module.exports.updateStaff=updateStaff;
