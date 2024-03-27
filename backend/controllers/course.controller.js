import prisma from "../db/prisma.js";
import AppError from "../utils/AppError.js";

export const createCourse = async (req, res) => {
    const { title, content } = req.body;
    const { user: { id: authorId } } = req.session

    const course = await prisma.course.create({
        data: {
            title,
            content,
            authorId,
        },
    });

    res.status(201).json({
        status: "success",
        data: {
            course,
        },
    });
}

export const getCourse = async (req, res) => {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
        where: {
            id: Number(id),
        },
    });

    res.status(200).json({
        status: "success",
        data: {
            course,
        },
    });
}

export const updateCourse = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, content} = req.body;

        const courseExists = await prisma.course.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!courseExists) {
            throw new AppError(404, "fail", "Course not found")
        }

        const course = await prisma.course.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                content,
            },
        });

        res.status(200).json({
            status: "success",
            data: {
                course,
            },
        });
    } catch (error) {
        next(error)
    }
}

export const deleteCourse = async (req, res, next) => {
    const { id } = req.params;

    try {
        const course = await prisma.course.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!course) {
            throw new AppError(404, "fail", "Course not found")
        }

        await prisma.course.delete({
            where: {
                id: Number(id),
            },
        });

        res.status(204).json({
            status: "success",
        });

    } catch (error) {
        next(error)
    }
}

export const getAllCourses = async (req, res) => {
    const courses = await prisma.course.findMany();

    res.status(200).json({
        status: "success",
        data: {
            courses,
        },
    });
}
