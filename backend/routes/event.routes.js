import express from 'express';
import EventModel from '../models/event.model.js'; 

const event = express.Router();

//event create route
event.post('/create', async (req, res) => {
    const { name, desc, start_date, end_date, users, tasks } = req.body;
});

//event info route
event.get('/info/:id', async (req, res) => {
    const { id } = req.params;
});

//event removal route
event.post('/remove', async (req, res) => {
    const { eventId } = req.body;
});

export default event;
