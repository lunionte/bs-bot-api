import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import express from "express";
import { loginRoute } from "./routes/loginRoute";
import { userRoute } from "./routes/userRoute";

const app = express();
app.use(cookieParser());

const frontendUri = process.env.ALLOWED_ORIGINS;
console.log(frontendUri);

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

app.use("/api/auth", loginRoute);
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
