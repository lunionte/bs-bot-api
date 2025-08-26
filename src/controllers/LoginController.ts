import { Request, Response } from "express";
import { LoginService } from "../services/loginService";

export class LoginController {
    // usado na rota discord/auth
    static async redirectToDiscord(req: Request, res: Response) {
        const redirect = process.env.REDIRECT_URI || "null";

        return res.redirect(redirect);
    }

    // usado na rota discord/callback
    static async loginWithDiscord(req: Request, res: Response) {
        const code = req.query.code as string;
        if (!code) {
            return res.status(400).json({ message: "Code não enviado" });
        }
        try {
            const token = await new LoginService().loginWithDiscord(code);

            const FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:3000";
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none", // importante para cross-domain
            });

            return res.redirect(FRONTEND_URI);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao autenticar com o Discord" });
        }
    }
    static async logout(req: Request, res: Response) {
        console.log("Entrando em logout");
        try {
            // limpa o cookie auth_token
            res.clearCookie("auth_token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
            });
            return res.status(200).json({ message: "Logout realizado com sucesso" });
        } catch (error) {
            console.error("Erro no logout:", error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }

    // remover essa lógica e colocar no middleware
    static async verifyUserToken(req: Request, res: Response) {
        const token = req.cookies.auth_token;
        if (!token) {
            return res.status(401).json({ message: "Não autenticado" });
        }
        console.log("TOKEN JWT:", token);
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
