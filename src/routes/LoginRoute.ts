import { Router } from "express";
import { LoginController } from "../controllers/LoginController";

export const loginRoute = Router();

loginRoute.get("/discord/callback", LoginController.redirectToDiscord);
loginRoute.get("/discord/login", LoginController.loginWithDiscord);
