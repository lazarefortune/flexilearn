import express from 'express';
import globalErrHandler from "./controllers/error.controller.js"

import userRoutes from './routes/user.routes.js';
import courseRoutes from "./routes/course.routes.js";
import explainerRoutes from "./routes/explainer.routes.js";
import AppError from "./utils/AppError.js";

const app = express();

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/explain', explainerRoutes);

app.get('/', (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome API',
    });
})

app.use("*", (req, res, next) => {
    const err = new AppError(404, "fail", "undefined route")
    next(err, req, res, next)
})

app.use(globalErrHandler)

export default app;