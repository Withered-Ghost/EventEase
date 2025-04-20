import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai"

const chatRouter = express.Router();
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

chatRouter.post('/send', async (req, res) => {
    const prompt = req.body.message;
    try {
        const result = await model.generateContent(prompt);
        // console.log(result.response.text())
        res.status(200).json({
            reply: result.response.text(),
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: "failed to generate response" });
    }
});

export default chatRouter;