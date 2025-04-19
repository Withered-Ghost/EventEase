import mongoose from 'mongoose';
import express from 'express';
import UserModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const userRouter = express.Router();
dotenv.config();

//signup ka route
userRouter.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // console.log(email + " " + password + " " + name);

        const duplicate_user = await UserModel.findOne({
            email: email
        });
        if (duplicate_user) {
            res.status(500).json({ error: 'email already exists' });
            return;
        }

        const hashed_password = await bcrypt.hash(password, 10);

        const new_user = new UserModel({
            email: email,
            password: hashed_password,
            name: name
        });

        const created_user = await UserModel.create(new_user);

        // console.log(created_user);
        res.status(200).json(null);
        // 200 ok
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'signup failed' });
        // 500 internal server error
    }
});

//auth route
userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log(email + " " + password);

        const user = await UserModel.findOne({
            email: email
        });

        if (!user) {
            res.status(401).json({ error: 'incorrect email/password' });
            return;
        }

        const password_match = await bcrypt.compare(password, user.password);
        if (password_match) {
            const token = jwt.sign(
                {
                    iat: Math.floor(Date.now() / 1000),
                    user_id: user._id,
                    exp: Math.floor(Date.now() / 1000) + 3600
                },
                process.env.JWT_SECRET
            );

            // console.log(token);
            res.status(200).json({
                token: token
            });
        } else {
            res.status(401).json({ error: 'incorrect email/password' });
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'login failed' });
    }
});

//userinfo route
userRouter.get('/info/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        const user = await UserModel.findOne({
            _id: new mongoose.Types.ObjectId(user_id)
        }, {
            password: 0
        });

        if (user) {
            // console.log(user);
            res.status(200).json(user);
        }
        else {
            res.status(500).json({ error: 'no match found' });
        }
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'error fetching user' });
    }
});

export default userRouter;