import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.router.js';
import eventRouter from './routes/event.router.js';
import taskRouter from './routes/task.router.js';
import chatRouter from './routes/chat.router.js';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:5173', 'https://event-ease-omega.vercel.app', 'https://event-ease-git-main-kaushik-jains-projects.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// app.use('/',(req,res)=>{
//     res.json({
//         msg : "Yes the backend is working"
//     })
// })

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