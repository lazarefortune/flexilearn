import pino from "pino";
import dotenv from "dotenv";
import app from "./app.js";
import { PrismaClient } from "@prisma/client"
import logger from "./utils/logger.js";
dotenv.config();


const PORT = process.env.APP_PORT || 4000;

const prisma = new PrismaClient()

//check if database is connected
prisma.$connect()
    .then(() => {
        logger.info("🚀 Database connected")
    })
    .catch((err) => {
        logger.error("🧨 Database connection failed")
    })

app.get("/api", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome API",
    });
})

app.listen(PORT, () => {
    // console.log(`✅  Server running on port ${PORT}`);
    logger.info(`✅  Server running on port ${PORT}`);
})