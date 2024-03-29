import express from "express";
import * as userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post("/inscription", userController.createUser);
router.post("/connexion", userController.signInUser);

router.put("/account/update", auth, userController.updateUser);

export default router;
