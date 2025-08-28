import { JsonDatabase } from "wio.db";
const db = new JsonDatabase({
    databasePath: "./databases/users.json",
});
export class UserRepository {
    async saveDb(
        id: string,
        email: string,
        username: string,
        accessToken: string,
        refreshToken: string,
        avatar: string
    ) {
        db.set(`user_${id}`, {
            id,
            username,
            email,
            accessToken,
            refreshToken,
            avatar,
        });
    }
}
