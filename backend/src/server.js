import dotenv from "dotenv";
import app from "./app.js";
import logger from "./utils/logger.js";
import knex from "knex";
import {Model} from "objection";
import databaseConfig from "./config/database.config.js";
dotenv.config();

const db = knex(databaseConfig)
Model.knex(db);

const PORT = process.env.APP_PORT || 4000;

db.raw("select 1+1 as result")
    .then(() => {
        logger.info("🚀 Database connected")
    })
    .catch(() => {
        logger.info("🧨 Database connection failed")
        process.exit(1)
    })

app.get("/api", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome API",
    });
})

app.listen(PORT, () => {
    logger.info(`✅  Server running on port ${PORT}`);
})

process.on("unhandledRejection", (err) => {
    logger.info("UNHANDLED REJECTION!!!  shutting down ...")
    logger.info(err.name, err.message)
    // eslint-disable-next-line no-undef
    server.close(() => {
        process.exit(1)
    })
})