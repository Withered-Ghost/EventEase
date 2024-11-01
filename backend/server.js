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


mongoose.connect(process.env.MONGODB_URI);