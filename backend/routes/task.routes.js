import express from 'express';
import TaskModel from '../models/task.model.js'; 
import EventModel from '../models/event.model.js'; 
const task = express.Router();

//task create route
task.post('/create', async (req, res) => {
    const { event_id, name, desc, created_by, assigned_to, status, due_at } = req.body;
});

//task info route
task.get('/info/:id', async (req, res) => {
    const { id } = req.params;
});

//task update route
task.post('/update', async (req, res) => {
    const { taskId, name, desc, status, due_at } = req.body;
});

//task delete route
task.post('/delete', async (req, res) => {
    const { taskId } = req.body;
});

export default task;
