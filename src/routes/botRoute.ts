import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { BotController } from "../controllers/botController";

export const botRoutes = Router();

botRoutes.post("/apps/:id/start", authMiddleware, BotController.start);
botRoutes.post("/apps/:id/stop", authMiddleware, BotController.stop);
botRoutes.post("/apps/:id/restart", authMiddleware, BotController.restart);
botRoutes.delete("/apps/:id", authMiddleware, BotController.delete);
