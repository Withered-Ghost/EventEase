import mongoose from "mongoose";

const { Schema } = mongoose;
const { SchemaTypes } = mongoose;

const eventSchema = new Schema(
    {
        name: { type: String, required: [true, 'Event name is required'] },
        desc: { type: String },
        start_date: { type: Date, default: Date.now() },
        end_date: { type: Date},
        users: [
            {
                user_id: { type: SchemaTypes.ObjectId }
            }
        ],
        tasks: [
            {
                task_id: { type: SchemaTypes.ObjectId }
            }
        ]
    },
    {
        timestamps: true
    }
);

const EventModel = mongoose.model('events', eventSchema);

export default EventModel;