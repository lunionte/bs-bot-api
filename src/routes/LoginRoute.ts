import { Router } from "express";
import { LoginController } from "../controllers/loginController";

export const loginRoute = Router();

loginRoute.get("/discord/login", LoginController.redirectToDiscord);
loginRoute.get("/discord/callback", LoginController.loginWithDiscord);
loginRoute.post("/logout", LoginController.logout);
