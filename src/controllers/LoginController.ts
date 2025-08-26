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
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: false, // true em produção com HTTPS
                sameSite: "lax",
            });
            return res.redirect("https://d7f5ff73224c.ngrok-free.app/");
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao autenticar com o Discord" });
        }
    }
}
