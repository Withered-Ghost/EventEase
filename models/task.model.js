import mongoose from "mongoose";

const { Schema } = mongoose;
const { SchemaTypes } = mongoose;

const taskSchema = new Schema(
    {
        event_id: { type: SchemaTypes.ObjectId },
        name: { type: String, required: [true, 'Task name is required'] },
        desc: { type: String },
        created_by: { type: SchemaTypes.ObjectId },
        assigned_to: [
            {
                user_id: { type: SchemaTypes.ObjectId }
            }
        ],
        status: { type: Number, default: 2, min: 0, max: 2 },
        // 2: not started, 1: in progress, 0: completed
        created_at: { type: Date, default: Date.now() },
        updated_at: { type: Date, default: Date.now() },
        due_at: { type: Date }
    },
    {
        timestamps: true
    }
);

const TaskModel = mongoose.model('tasks', taskSchema);

export default TaskModel;