import jwt from "jsonwebtoken";
import { UserService } from "./userService";
import { UserData } from "../models/userInterface";
import { DiscordService } from "./discordService";

export class LoginService {
    private userService;
    private discordService;
    constructor() {
        this.userService = new UserService();
        this.discordService = new DiscordService();
    }

    async loginWithDiscord(code: string) {
        const tokenResponse = await this.discordService.getAuthToken(code);

        if (!tokenResponse.ok) {
            throw new Error("Erro ao obter token do Discord");
        }

        const { access_token, refresh_token } = await tokenResponse.json();
        const userDataFromDiscord = await this.discordService.getDiscordUserData(access_token);

        const userData: UserData = {
            id: userDataFromDiscord.id,
            username: userDataFromDiscord.username,
            avatar: userDataFromDiscord.avatar,
            email: userDataFromDiscord.email,
            access_token,
            refresh_token,
        };

        await this.userService.save(userData);

        // gera jwt
        const jwtToken = jwt.sign(
            {
                id: userData.id,
                username: userData.username,
                avatar: userData.avatar,
                email: userData.email,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        return jwtToken;
    }
}
