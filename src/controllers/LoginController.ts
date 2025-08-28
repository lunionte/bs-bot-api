import { Request, Response } from "express";
import { LoginService } from "../services/loginService";

export class LoginController {
    // usado na rota discord/auth
    static async redirectToDiscord(req: Request, res: Response) {
        // redirect uri é o gerado pelo discord app
        //const redirect = process.env.REDIRECT_URI_LOGIN!;
        console.log("📶 Redirecionando...");
        const redirect = process.env.REDIRECT_URI_LOGIN!;
        return res.redirect(redirect);
    }

    // usado na rota discord/callback
    static async loginWithDiscord(req: Request, res: Response) {
        const code = req.query.code as string;
        if (!code) {
            console.log("Token (code) não enviado");
            return res.status(400).json({ message: "Token (code) não enviado" });
        }
        try {
            const token = await new LoginService().loginWithDiscord(code);
            console.log("🔣 Token enviado (JWT)", token);

            const FRONTEND_URI = process.env.FRONTEND_URI!;

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
        try {
            // limpa o cookie auth_token
            res.clearCookie("auth_token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "none",
            });
            console.log("🗑️ Limpando cookies...");
            return res.status(200).json({ message: "Logout realizado com sucesso" });
        } catch (error) {
            console.error("Erro no logout:", error);
            return res.status(500).json({ message: "Erro interno no servidor" });
        }
    }
}
