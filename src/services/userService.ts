import { UserData } from "../models/userInterface";
import { UserRepository } from "../repositories/userRepository";

export class UserService {
    private userRepository;
    constructor() {
        this.userRepository = new UserRepository();
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
