import mongoose from 'mongoose';
import express from 'express';
import UserModel from '../models/user.model.js';
import EventModel from '../models/event.model.js';

const eventRouter = express.Router();

eventRouter.post('/create', async (req, res) => {
    try {
        const { name, desc, start_date, end_date, user_id, members } = req.body;

        const member_ids = [];
        for(const member of members) {
            // for each email, if that user exists
            const user = await UserModel.findOne({
                email: member
            });
            if(user) member_ids.push(user._id);
        }
        member_ids.unshift(new mongoose.Types.ObjectId(user_id));

        const newEvent = new EventModel({
            name: name,
            desc: desc,
            start_date: (start_date ? new Date(start_date) : undefined),
            end_date: (end_date ? new Date(end_date) : undefined),
            members: member_ids
        });

        const createdEvent = await EventModel.create(newEvent);

        for(const member_id of member_ids) {
            await UserModel.updateMany({
                _id: member_id
            }, {
                $push: {
                    events: createdEvent._id
                }
            });
        }

        res.status(200).json(null);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error creating event'});
        // 500 internal server error
    }
});

eventRouter.get('/info/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;

        // get user doc
        const user = await UserModel.findOne({
            _id: new mongoose.Types.ObjectId(user_id)
        });

        if(!user) {
            res.status(500).json({error: 'no match found'});
            return;
        }

        // get the event info
        const events = []
        for(const event_id of user.events) {
            const event = await EventModel.findOne({
                _id: new mongoose.Types.ObjectId(event_id)
            });
            if(event) {
                const members = [];
                for(const member of event.members) {
                    const user = await UserModel.findOne({
                        _id: member
                    });
                    if(user) members.push(user.name);
                }
                events.push({event: event, members: members});
            }
        }

        res.status(200).json({ event_info: events });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error fetching events'});
    }
});

// eventRouter.post('/delete', async (req, res) => {
//     try {
//         const { user_id, event_id } = req.body;

//         // check if user has access to event or not
//         const user = await UserModel.findOne({
//             _id: new mongoose.Types.ObjectId(user_id),
//             events: new mongoose.Types.ObjectId(event_id)
//         });
//         if(!user) {
//             res.status(500).json({error: 'no match found'});
//             return;
//         }

//         const event = await EventModel.findOne({
//             _id: new mongoose.Types.ObjectId(event_id)
//         });
//         // delete the event
//         await EventModel.deleteOne({
//             _id: new mongoose.Types.ObjectId(event_id)
//         });

//         // remove event id from each member
//         for(const member of event.members) {
//             await UserModel.updateOne({
//                 _id: member
//             }, {
//                 $pull: {
//                     events: event._id
//                 }
//             });
//         }

//         res.status(200).json(event);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: 'event deletion failed'});
//     }
// });


export default eventRouter;