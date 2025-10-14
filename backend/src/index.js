const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const calendarController = require('./controllers/calendarController');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Placeholder: implement your MySQL auth middleware and endpoints for listing inspectors/providers
app.post('/api/availability', calendarController.getAvailability);
app.post('/api/schedule', calendarController.scheduleMeeting);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on ${port}`));
