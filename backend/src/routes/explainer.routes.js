import express from "express";
import openaiService from "../services/openai.service.js";
const router = express.Router();
import auth from "../middleware/auth.js";
import Course from "../database/models/course.model.js";
import User from "../database/models/user.model.js";
import AppError from "../utils/AppError.js";

router.get("/course/:id", auth, async (req, res, next) => {
    try{
        const { id: courseId } = req.params;
        const { user: { id: userId } } = req.session;


        // find course by id
        const course = await Course.query().findOne({
            id: Number(courseId),
        });

        if (!course) {
            throw new AppError(404, "fail", "Course not found");
        }

        // find user by id
        const user = await User.query().findOne({
            id: userId,
        });

        if (!user) {
            throw new AppError(404, "fail", "User not found");
        }

        const userPreference = user?.preference || [];
        let message = "Tu es un professeur, et ton élève à les préférences suivantes en terme d'explication : ";
        message += userPreference + ". ";
        message += "Explique lui le cours suivant : " + course.content;
        const response = await openaiService.getCompletion(message);

        res.json({
            status: "success",
            data: {
                response,
            },
        });
    } catch (error) {
        next(error);
    }
});

export default router;