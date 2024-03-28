import express from "express";

const router = express.Router();

router.get("/course/:id", (req, res) => {
    res.send({
        status: "success",
        data: {
            course: {
                id: req.params.id,
                title: "Course title",
                description: "Course description",
            },
        },
    });
});

export default router;