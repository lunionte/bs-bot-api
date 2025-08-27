import { Router } from "express";
import { LoginController } from "../controllers/loginController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { UserController } from "../controllers/userController";

export const userRoute = Router();

userRoute.get("/me", authMiddleware, UserController.getMe);
