const express = require('express');
const cors = require('cors');
const staffService = require('./staffService.js');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/staff/all', (req, res) => {
    const data = staffService.getAll();
    res.json(data);
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
        res.json(staff);
    } else {
        res.status(404).send(`The staff with an id of ${id} could not be found!`);
    }
});

app.post('/api/staff', (req, res) => {
    // Code is optimistic and assumes the body will have all the necessary data
    const { id, fullName, imageUrl, phoneNumber, houseLot, street, suburb, postcode, state} = req.body;

    const staff = staffService.addStaff(id, fullName, imageUrl, phoneNumber, houseLot, street, suburb, postcode, state);

    res.status(201);
    res.location(`/api/staff?id=${staff.id}`);
    res.send();
});

app.listen(port, () => {
    console.log(`Staff Library API Server listening on port ${port}`);
});