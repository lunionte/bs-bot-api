import { UserData } from "../models/userInterface";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
    private userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getDiscordUserData(access_token: string, refreshToken: string) {
        const response = await fetch("https://discord.com/api/users/@me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados do Discord");
        }

        const { id, email, username, avatar } = await response.json();
        return { id, email, username, avatar };
    }

    async save(userData: UserData) {
        await this.userRepository.saveDb(
            userData.id,
            userData.email,
            userData.username,
            userData.access_token,
            userData.refresh_token,
            userData.avatar
        );
    }
}
