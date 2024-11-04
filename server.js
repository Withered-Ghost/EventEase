import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.router.js';
import eventRouter from './routes/event.router.js';
import taskRouter from './routes/task.router.js';
import { chatRouter } from './routes/chat.router.js';
import cors from 'cors';

dotenv.config({path: './.env'});
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/event', eventRouter);
app.use('/api/task', taskRouter);
app.use('/api/chat', chatRouter);

async function main() {
    await mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_EventEase);
    console.log('Connected to database');
    app.listen(port, () => console.log('Server listening on port: ' + port));
}

main();