import { Router } from "express";
import { LoginController } from "../controllers/LoginController";

export const loginRoute = Router();

loginRoute.post("/login", LoginController.loginWithDiscord);
