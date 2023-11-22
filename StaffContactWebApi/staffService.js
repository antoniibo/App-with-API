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

function addStaff(fullName, imageUrl, phoneNumber, houseLot, street, suburb, postcode, state) {
    const staff = {
        id: getNextId(),
        fullName:fullName, 
        imageUrl:imageUrl, 
        phoneNumber:phoneNumber, 
        houseLot:houseLot, 
        street:street, 
        suburb:suburb, 
        postcode:postcode, 
        state:state
    };

    staffData.push(staff);

    return staff;
}


let lastId = 2;

function getNextId() {
    const nextId = lastId + 1;
    lastId = nextId;
    return nextId;
}

module.exports.getAll = getAll;
module.exports.getById = getById;
module.exports.addStaff = addStaff;
