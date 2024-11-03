import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import UserModel from "./models/user.model.js";
import EventModel from "./models/event.model.js";
import TaskModel from "./models/task.model.js";

dotenv.config({path: './.env'});

mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

const app = express();
app.use(express.json());

async function main() {
    mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_EventEase)
    .then(
        async function() {
            const newUser = new UserModel({
                email: 'nigga',
                password: 'pass',
                name: 'naaame'
            });

            await UserModel.create(newUser)
            .then(() => console.log('new user inserted'))
            .catch((err) => console.log(err));
        }
    )
    .catch((err) => {
        console.log(err);
    });
}

main();