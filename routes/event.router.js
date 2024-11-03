import mongoose from 'mongoose';
import express from 'express';
import UserModel from '../models/user.model.js';
import EventModel from '../models/event.model.js';

const eventRouter = express.Router();

eventRouter.post('/create', async (req, res) => {
    try {
        const { name, desc, start_date, end_date, user_id, members } = req.body;

        members.unshift(user_id);
        const member_ids = [];
        for(const member of members) {
            member_ids.push(new mongoose.Types.ObjectId(member));
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

        for(const member_id of member_ids) {
            await UserModel.update({
                _id: member_id
            }, {
                $push: {
                    events: createdEvent._id
                }
            });
        }

        res.status(200).json(createdEvent);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error creating event'});
        // 500 internal server error
    }
});

// eventRouter.post('/addmember', async (req, res) => {
//     try {
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: 'login failed'});
//     }
// });

eventRouter.get('/info/:user_id/:event_id', async (req, res) => {
    try {
        const { user_id, event_id } = req.params;

        const user = await UserModel.findOne({
            _id: new mongoose.Types.ObjectId(user_id),
            events: new mongoose.Types.ObjectId(event_id)
        });

        if(!user) {
            res.status(500).json({error: 'no match found'});
            return;
        }

        const event = await EventModel.findOne({
            _id: new mongoose.Types.ObjectId(event_id)
        });

        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'event info fetch failed'});
    }
});

// eventRouter.post('/remove', async (req, res) => {
//     const { eventId } = req.body;
// });


export default eventRouter;