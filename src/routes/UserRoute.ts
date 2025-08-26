import { Router } from "express";
import { LoginController } from "../controllers/LoginController";

export const userRoute = Router();

userRoute.get("/me", LoginController.verifyUserToken);
