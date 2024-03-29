import OpenAI from "openai";
import dotenv from 'dotenv';
import logger from "../utils/logger.js";

dotenv.config();


export default {
    createInstance() {
        return new OpenAI(process.env.OPENAI_API_KEY);
    },

    async getCompletion(prompt) {
        const openai = this.createInstance();
        const gptResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return gptResponse.choices[0].message.content;
    }
}