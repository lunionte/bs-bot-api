import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import express from "express";
import { loginRoute } from "./routes/loginRoute";
import { userRoute } from "./routes/userRoute";
import { botRoutes } from "./routes/botRoute";

const app = express();
app.use(cookieParser());

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = process.env.ALLOWED_ORIGINS || "undefined";
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("CORS not allowed"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/auth", loginRoute);
app.use("/api", botRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("🟢 Servidor rodando na porta", PORT);
});
