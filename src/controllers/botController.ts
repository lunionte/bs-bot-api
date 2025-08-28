import { Request, Response } from "express";

export class BotController {
    static async start(req: Request, res: Response) {
        res.json({ message: "🟢 Bot iniciado com sucesso" });
    }

    static async stop(req: Request, res: Response) {
        res.json({ message: "🛑 Bot iniciado com sucesso" });
    }
    static async restart(req: Request, res: Response) {
        res.json({ message: "🔃 Bot iniciado com sucesso" });
    }
    static async delete(req: Request, res: Response) {
        res.end();
    }
}
