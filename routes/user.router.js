import mongoose from 'mongoose';
import express from 'express';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

const userRouter = express.Router();

//signup ka route
userRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const duplicateUser = await UserModel.findOne({
            email: email
        });
        if(duplicateUser) return res.status(500).json({errMsg: 'email already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            email: email,
            password: hashedPassword,
            name: name,
            events: []
        });

        const createdUser = await UserModel.create(newUser);

        res.status(200).json(createdUser);
        // 200 ok
    }
    catch (err) {
        console.log(err);
        res.status(500).json({errMsg: 'invalid fields'});
        // 500 internal server error
    }
});

//auth route
userRouter.post('/signin', async (req, res) => {
    const { email, password } = req.body;
});

//userinfo  route
userRouter.get('/info/:id', async (req, res) => {
    const { id } = req.params;
});

export default userRouter;