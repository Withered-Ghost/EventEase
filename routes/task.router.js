import mongoose from 'mongoose';
import express from 'express';
import UserModel from '../models/user.model.js';
import EventModel from '../models/event.model.js';
import TaskModel from '../models/task.model.js';

const taskRouter = express.Router();

// create new task
taskRouter.post('/create', async (req, res) => {
    try {
        const { event_id, name, desc, created_by, assigned_to, created_at, due_at } = req.body;
        console.log(event_id + " " + name + " " + desc + " " + created_by + " " + assigned_to + " " + created_at + " " + due_at);

        const event = await EventModel.findOne({
            _id: new mongoose.Types.ObjectId(event_id)
        });

        const assigned_to_ids = [];
        for (const member of assigned_to) {
            // for each email, if that user exists and is in the event, add to list
            const user = await UserModel.findOne({
                email: member
            });
            if ((user) && (event.members.includes(user._id))) {
                assigned_to_ids.push(user._id);
            }
        }

        const new_task = new TaskModel({
            event_id: new mongoose.Types.ObjectId(event_id),
            name: name,
            desc: desc,
            created_by: new mongoose.Types.ObjectId(created_by),
            assigned_to: assigned_to_ids,
            created_at: (created_at ? new Date(created_at) : undefined),
            updated_at: (created_at ? new Date(created_at) : undefined),
            due_at: (due_at ? new Date(due_at) : undefined)
        });

        const created_task = await TaskModel.create(new_task);

        await EventModel.updateOne({
            _id: created_task.event_id
        }, {
            $push: {
                tasks: created_task._id
            }
        });

        console.log(created_task);
        res.status(200).json(null);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error creating task' });
    }
});

// get task info
taskRouter.get('/info/:event_id', async (req, res) => {
    try {
        const { event_id } = req.params;

        // get event doc
        const event = await EventModel.findOne({
            _id: new mongoose.Types.ObjectId(event_id)
        });

        if (!event) {
            res.status(500).json({ error: 'no match found' });
            return;
        }

        const tasks = [];
        for (const task_id of event.tasks) {
            const task = await TaskModel.findOne({
                _id: new mongoose.Types.ObjectId(task_id)
            });
            if (task) {
                const members = [];
                for (const member_id of task.assigned_to) {
                    const user = await UserModel.findOne({
                        _id: member_id
                    });
                    if (user) members.push(user.name);
                }
                tasks.push({ task: task, usernames: members });
            }
        }

        console.log(tasks);
        res.status(200).json({ task_info: tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error fetching tasks' });
    }
});

// update task
taskRouter.post('/update', async (req, res) => {
    try {
        const { task_id, status } = req.body;
        console.log(task_id + " " + status);

        await TaskModel.updateOne({
            _id: new mongoose.Types.ObjectId(task_id)
        }, {
            $set: {
                status: status,
                updated_at: new Date(Date())
            }
        });

        res.status(200).json(null);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'error updating task' });
    }
});

export default taskRouter;