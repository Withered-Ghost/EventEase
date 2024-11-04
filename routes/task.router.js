import mongoose from 'mongoose';
import express from 'express';
import UserModel from '../models/user.model.js';
import EventModel from '../models/event.model.js';
import TaskModel from '../models/task.model.js';

const taskRouter = express.Router();

taskRouter.post('/create', async (req, res) => {
    try {
        const { event_id, name, desc, created_by, assigned_to, created_at, due_at} = req.body;

        const assigned_to_ids = [];
        for(const member of assigned_to) {
            // for each email, if that user exists
            const user = await UserModel.findOne({
                email: member
            });
            if(user) assigned_to_ids.push(user._id);
        }

        const newTask = new TaskModel({
            event_id: new mongoose.Types.ObjectId(event_id),
            name: name,
            desc: desc,
            created_by: new mongoose.Types.ObjectId(created_by),
            assigned_to: assigned_to_ids,
            created_at: (created_at ? new Date(created_at) : new Date(Date())),
            updated_at: (created_at ? new Date(created_at) : new Date(Date())),
            due_at: new Date(due_at)
        });

        res.json(null);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'error creating task'});
    }
});

// taskRouter.get('/info/:user_id/:event_id/:task_id', async (req, res) => {

// });

// taskRouter.post('/update', async (req, res) => {

// });

// taskRouter.post('/delete', async (req, res) => {

// });

export default taskRouter;