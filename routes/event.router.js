import mongoose from 'mongoose';
import express from 'express';
import EventModel from '../models/event.model.js';

const eventRouter = express.Router();

eventRouter.post('/create', async (req, res) => {
    try {
        const { name, desc, start_date, end_date, user_id, members } = req.body;

        members.unshift(user_id);
        const member_ids = [];
        for(const member of members) {
            member_ids.push({user_id: new mongoose.Types.ObjectId(member)});
        }

        const newEvent = new EventModel({
            name: name,
            desc: desc,
            start_date: (start_date ? new Date(start_date) : new Date(Date())),
            end_date: (end_date ? new Date(end_date) : null),
            members: member_ids,
            tasks: []
        });

        const createdEvent = await EventModel.create(newEvent);

        res.status(200).json(newEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error creating event'});
        // 500 internal server error
    }
});

eventRouter.post('/addmember', async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'login failed'});
    }
});

eventRouter.get('/info/:event_id', async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'user info fetch failed'});
    }
});

eventRouter.post('/remove', async (req, res) => {
    const { eventId } = req.body;
});


export default eventRouter;