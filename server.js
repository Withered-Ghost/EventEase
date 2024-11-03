import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import chat from "./routes/chat.route"
dotenv.config({path: './.env'});

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

// app.use('/api/user', userRouter);
// app.use('/api/event', eventRouter);
// app.use('/api/task', taskRouter);
app.use('/api/chat', chat);

async function main() {
    await mongoose.connect(process.env.MONGODB_URI + process.env.MONGODB_EventEase);
    app.listen(port, () => console.log('Server listening on port: ' + port));
}

main();