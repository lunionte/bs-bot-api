import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";

export class LoginController {
    static async redirectToDiscord(req: Request, res: Response) {
        const redirect = process.env.REDIRECT_URI || "null";

        return res.redirect(redirect);
    }

    static async loginWithDiscord(req: Request, res: Response) {
        const code = req.query.code as string;
        if (!code) {
            return res.status(400).json({ message: "Code não enviado" });
        }
        try {
            const token = await new LoginService().loginWithDiscord(code);

            const FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
            return res.redirect(`${FRONTEND_URI}?token=${token}`);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao autenticar com o Discord" });
        }
    }

    static async verifyUserToken(req: Request, res: Response) {
        const token = req.headers.authorization;
        console.log("TOKEN JWT:", token);
        console.log("TOKEN JWT 23213121231231213312", token);
        if (!token) {
            return res.status(401).json({ message: "Não autenticado" });
        }
        try {
            const user = await new LoginService().verifyJwt(token);
            console.log(user);
            return res.json({ user });
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Token inválido" });
        }
    }
}
