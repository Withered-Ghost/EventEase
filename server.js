import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.router.js';
import eventRouter from './routes/event.router.js';
import taskRouter from './routes/task.router.js';
import { chatRouter } from './routes/chat.router.js';
import cors from 'cors';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
    origin: ['http://localhost:5173', 'https://event-ease-woad.vercel.app'], // Add your frontend URLs here
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Version', 'X-CSRF-Token'],
    credentials: true,
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    res.header('Access-Control-Allow-Methods', corsOptions.methods.join(','));
    res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
});
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