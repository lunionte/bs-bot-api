export class DiscordService {
    async getDiscordUserData(access_token: string) {
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

    async getAuthToken(code: string) {
        console.log("Entrou no getAuth");

        return await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: process.env.CLIENT_ID || "null",
                client_secret: process.env.CLIENT_SECRET || "null",
                grant_type: "authorization_code",
                code: code,
                // só para confirmar, sendo exatamente igual ao que ta na discord app
                redirect_uri: process.env.REDIRECT_URI_DISCORD!,
            }),
        });
    }
}
