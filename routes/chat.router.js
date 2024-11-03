// chat.route.js
import { Router } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const chatRouter = Router();
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

chatRouter.post('/send', async (req, res) => {
    const prompt = req.body.message;
    try {
        const result = await model.generateContent(prompt);
        // console.log(result.response.text())
        res.status(200).json({
            reply: result.response.text(),
        });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ error: "Failed to generate response" });
    }
});

export { chatRouter };