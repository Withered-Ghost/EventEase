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

// const corsOptions = {
//     origin: ['*'], // Add frontend/client URLs here
//     methods: ['GET', 'POST', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Version', 'X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Date'],
//     credentials: true,
//     optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));
app.use(cors({
    origin: 'http://localhost:5173', // or ['http://localhost:5173'] if you plan to add more origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // if you're using cookies/JWT with credentials
  }));
app.use(express.json());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', corsOptions.origin);
//     res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(','));
//     res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
//     res.setHeader('Access-Control-Allow-Credentials', 'true');

//     if (req.method === "OPTIONS") {
//         res.status(200).end();
//         return;
//     } else {
//         next();
//     }
// });

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