import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'];
    const token = authHeader;

    if (!token) {
        return res.status(401).json({ error: 'unauthorized' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user_id = verified.user_id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'unauthorized' });
    }
};
