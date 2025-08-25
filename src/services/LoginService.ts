export class LoginService {
    async loginWithDiscord(code: string) {
        const params = new URLSearchParams();
        params.append("client_id", process.env.CLIENT_ID || "null");
        params.append("client_secret", process.env.CLIENT_SECRET || "null");
        params.append("grant_type", "authorization_code");
        params.append("code", code);
        params.append("redirect_uri", process.env.REDIRECT_URI || "null");
        console.log("CLIENT ID:", process.env.CLIENT_ID);
        console.log("CLIENT SECRET:", process.env.CLIENT_SECRET);
        console.log("URI:", process.env.REDIRECT_URI);
        console.log("Codigo:", code);

        console.log("Vai tentar dar o fetch");
        const response = await fetch("https://discord.com/api/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params,
        });

        console.log("Status:", response.status);
        console.log("Content-Type:", response.headers.get("content-type"));

        const data = await response.text();
        console.log("Raw response:", data);

        return data;
    }
}
