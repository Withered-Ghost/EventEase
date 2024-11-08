import mongoose from "mongoose";

const { Schema } = mongoose;
const { SchemaTypes } = mongoose;

const userSchema = new Schema(
    {
        email: { type: String, unique: true, required: [true, 'Email is required'] },
        password: { type: String, required: [true, 'Password is required'] },
        name: { type: String, required: [true, 'Name is required'] },
        events: { type: [SchemaTypes.ObjectId] }
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model('users', userSchema);

export default UserModel;