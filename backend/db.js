import mongoose from "mongoose";

const mongoSchema = mongoose.Schema;
const mongoSchemaTypes = mongoose.SchemaTypes;

const userSchema = new mongoSchema({
    email: { type: mongoSchemaTypes.String, unique: true, required: [true, 'Email is required']},
    password: { type: mongoSchemaTypes.String, required: [true, 'Password is required']},
    name: { type: mongoSchemaTypes.String, required: [true, 'Name is required']},
    events: [
        {
            event_id: { type: mongoSchemaTypes.ObjectId},
            role: { type: mongoSchemaTypes.Number, min: 0, max: 1}
            // 0: admin, 1: user
        }
    ]
});

const eventSchema = new mongoSchema({
    name: { type: mongoSchemaTypes.String, required: [true, 'Event name is required']},
    desc: { type: mongoSchemaTypes.String},
    start_date: { type: mongoSchemaTypes.Date, default: Date.now()},
    end_date: { type: mongoSchemaTypes.Date},
    users: [
        {
            user_id: { type: mongoSchemaTypes.ObjectId},
            role: { type: mongoSchemaTypes.Number}
        }
    ],
    tasks: [
        {
            task_id: { type: mongoSchemaTypes.ObjectId}
        }
    ]
});

const taskSchema = new mongoSchema({
    event_id: { type: mongoSchemaTypes.ObjectId},
    name: { type: mongoSchemaTypes.String, required: [true, 'Task name is required']},
    desc: { type: mongoSchemaTypes.String},
    created_by: { type: mongoSchemaTypes.ObjectId},
    assigned_to: [
        {
            user_id: { type: mongoSchemaTypes.ObjectId}
        }
    ],
    status: { type: mongoSchemaTypes.Number, default: 2, min: 0, max: 2},
    // 2: not started, 1: in progress, 0: completed
    created_at: { type: mongoSchemaTypes.Date, default: Date.now()},
    updated_at: { type: mongoSchemaTypes.Date, default: Date.now()},
    due_at: { type: mongoSchemaTypes.Date}
});

const UserModel = mongoose.model('users', userSchema);
const EventModel = mongoose.model('events', eventSchema);
const TaskModel = mongoose.model('tasks', taskSchema);

module.exports = {
    UserModel,
    EventModel,
    TaskModel
};