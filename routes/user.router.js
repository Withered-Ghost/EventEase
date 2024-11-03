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
        if(duplicateUser) {
            res.status(500).json({error: 'email already exists'});
            return;
        }

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
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'invalid fields'});
        // 500 internal server error
    }
});

//auth route
userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({
            email: email
        });

        if(!user) {
            res.status(500).json({error: 'incorrect email/password'});
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch) {
            res.status(200).json(user);
        }
        else {
            res.status(500).json({error: 'incorrect email/password'});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'login failed'});
    }
});

//userinfo  route
userRouter.get('/info/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await UserModel.findOne({
            _id: new mongoose.Types.ObjectId(user_id)
        }, {
            password: 0
        });

        if(user) {
            res.status(200).json(user);
        }
        else {
            res.status(500).json({error: 'no match found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'user info fetch failed'});
    }
});

export default userRouter;