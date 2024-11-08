import  dotenv from "dotenv";
dotenv.config();
import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
