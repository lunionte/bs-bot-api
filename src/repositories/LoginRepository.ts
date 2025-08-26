import { JsonDatabase } from "wio.db";
const db = new JsonDatabase({
    databasePath: "./databases/users.json",
});
export class LoginRepository {
    async saveDb(
        id: string,
        email: string,
        username: string,
        acessToken: string,
        refreshToken: string,
        avatar: string
    ) {
        db.set(`user_${id}`, {
            id,
            username,
            email,
            acessToken,
            refreshToken,
            avatar,
        });
    }
}
