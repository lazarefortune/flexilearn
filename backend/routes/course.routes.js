import express from "express";
import * as courseController from "../controllers/course.controller.js";
import auth from "../middleware/auth.js";
import {validate} from "../middleware/validator.js";
import {courseSchema} from "../domain/courses/validator/course.validator.js";

const router = express.Router();

router.get("/", auth, courseController.getAllCourses);
router.get("/:id", auth, courseController.getCourse);
router.post("/create", auth, validate(courseSchema), courseController.createCourse);
router.put("/:id", auth, validate(courseSchema), courseController.updateCourse);
router.delete("/:id", auth, courseController.deleteCourse);

export default router;