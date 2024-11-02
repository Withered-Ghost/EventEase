import express from 'express';
import UserModel from '../models/user.model.js';
const user = express.Router();

//signup ka route
user.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;
});

//auth route
router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
});

//userinfo  route 
router.get('/info/:id', async (req, res) => {
    const { id } = req.params;
});

export default user;
