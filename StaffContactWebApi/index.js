const express = require('express');
const cors = require('cors');
const staffService = require('./staffService.js');
const departmentService = require('./departmentService.js')
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/staff/all', (req, res) => {
    const data = staffService.getAll();
    const result = data.map((staff) => {
        const department = departmentService.getById(staff.departmentId);

        return {
            id: staff.id,
            fullName: staff.fullName,
            imageUrl: staff.imageUrl,
            department: department ? { id: department.id, name: department.name } : null,
            phoneNumber: staff.phoneNumber,
            houseLot:staff.houseLot,
            street: staff.street,
            suburb: staff.suburb,
            postcode: staff.postcode,
            state: staff.state,
        };
    });
    res.json(result);
});

app.get('/api/staff', (req, res) => {
    if (req.query.id === undefined) {
        res.status(400).send('Missing the query string parameter \'id\'!');
        return;
    }

    const id = parseInt(req.query.id);
    if (isNaN(id)) {
        res.status(400).send('The \'id\' parameter MUST be an integer value!');
        return;
    }
    
    const staff = staffService.getById(id);

    if (staff !== null) {
        const department = departmentService.getById(staff.departmentId);
        res.json({
            id: staff.id,
            fullName: staff.fullName,
            imageUrl: staff.imageUrl,
            department: department ? { id: department.id, name: department.name } : null,
            phoneNumber: staff.phoneNumber,
            houseLot:staff.houseLot,
            street: staff.street,
            suburb: staff.suburb,
            postcode: staff.postcode,
            state: staff.state,
        });
    } else {
        res.status(404).send(`The staff with an id of ${id} could not be found!`);
    }
});

app.post('/api/staff', (req, res) => {
    const { fullName, imageUrl, departmentId, phoneNumber, houseLot, street, suburb, postcode, state} = req.body;

    const staff = {
        id: 0,
        fullName: fullName,
        imageUrl:imageUrl,
        departmentId: departmentId,
        phoneNumber: phoneNumber,
        houseLot:houseLot,
        street: street,
        suburb: suburb,
        postcode: postcode,
        state: state,
    }
    staffService.addStaff(staff)

    res.status(201);
    res.location(`/api/staff?id=${staff.id}`);
    res.send();
});

app.put('/api/staff', (req, res) => {
    const { id, fullName, imageUrl,departmentId, phoneNumber, houseLot, street, suburb, postcode, state } = req.body;

    const staff = staffService.getById(id);

    if (staff === null) {
        res.status(404).send(`The staff with an id of ${id} could not be found!`);
    } else {
        staff.fullName = fullName,
        staff.imageUrl = imageUrl,
        staff.departmentId=departmentId,
        staff.phoneNumber = phoneNumber,
        staff.houseLot = houseLot,
        staff.street = street,
        staff.suburb = suburb,
        staff.postcode = postcode,
        staff.state = state

        staffService.updateStaff(staff);
        res.send();
    }
});

app.get('/api/departments', (req, res) => {
    const departments = departmentService.getAll();

    res.json(departments);
});

app.listen(port, () => {
    console.log(`Staff Library API Server listening on port ${port}`);
});