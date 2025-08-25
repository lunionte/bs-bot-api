import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

console.log("Controller carregado");
export class LoginController {
    static async loginWithDiscord(req: Request, res: Response) {
        console.log("Entrou no loginWithDiscord");
        const { code } = req.body;

        const response = await new LoginService().loginWithDiscord(code);

        if (!response) {
            return res.status(400).json({ message: "Algo deu errado" });
        }

        res.json({ data: response });
    }
}
