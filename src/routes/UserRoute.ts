import { Router } from "express";
import { LoginController } from "../controllers/loginController";

export const userRoute = Router();

userRoute.get("/me", LoginController.verifyUserToken);
