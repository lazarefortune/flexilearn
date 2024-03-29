import jsonwebtoken from "jsonwebtoken";
import configuration from "../config/configuration.js"
import User from "../database/models/user.model.js";
import AppError from "../utils/AppError.js";

export const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check all fields are filled
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            });
        }

        // check if user exists
        const user = await User.query().where('email', email).first();

        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }

        // check if password is correct
        if (user.password !== password) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid email or password",
            });
        }

        const token = jsonwebtoken.sign(
            {
                payload: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                },
            },
            configuration.security.session.secret,
            { expiresIn: configuration.security.session.expireAfter }
        )

        res.status(200).json({
            status: "success",
            data: {
                token,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check all fields are filled
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            });
        }

        // check if user already exists
        const userExists = await User.query().where('email', email).first();

        if (userExists) {
            return res.status(400).json({
                status: "fail",
                message: "User already exists",
            });
        }

        // create user
        const user = await User.query().insert({
            name,
            email,
            password,
        });

        res.status(201).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
        });
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { name, email, password, preference } = req.body;
        const { user: { id: currentUserId } } = req.session;

        const userExists = await User.query().findById(currentUserId);

        if (!userExists) {
            throw new AppError(404, "fail", "User not found")
        }

        await User.query().findById(currentUserId).patch({
            name,
            email,
            password,
            preference
        });

        const user = await User.query().findById(currentUserId);

        res.status(200).json({
            status: "success",
            data: user,
        });
    } catch (error) {
        next(error)
    }
}