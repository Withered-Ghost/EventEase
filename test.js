import mongoose from 'mongoose';

const id = new mongoose.Types.ObjectId('123456789012345678901234');
console.log(id.toJSON());