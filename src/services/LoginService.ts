import { LoginRepository } from "../repositories/LoginRepository";
import jwt from "jsonwebtoken";

export class LoginService {
    private loginRepository;

    constructor() {
        this.loginRepository = new LoginRepository();
    }

    async loginWithDiscord(code: string) {
        const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.CLIENT_ID || "null",
                client_secret: process.env.CLIENT_SECRET || "null",
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.REDIRECT_URI || "null",
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error("Erro ao obter token do Discord");
        }

        const { access_token, refresh_token } = await tokenResponse.json();
        const userData = await this.getDiscordUserData(access_token, refresh_token);

        console.log("Acess token:", access_token);
        console.log("Dados do usuário:", userData);

        await this.loginRepository.saveDb(
            userData.id,
            userData.email,
            userData.username,
            access_token,
            refresh_token,
            userData.avatar
        );

        const jwtToken = jwt.sign(
            {
                id: userData.id,
                username: userData.username,
                avatar: userData.avatar,
                email: userData.email,
            },
            process.env.JWT_SECRET || "null",
            { expiresIn: "7d" }
        );

        return jwtToken;
    }

    async getDiscordUserData(acess_token: string, refreshToken: string) {
        const response = await fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${acess_token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do Discord");
        }

        const { id, email, username, avatar } = await response.json();
        return { id, email, username, avatar };
    }
}
