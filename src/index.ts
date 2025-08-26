import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
import express from "express";
import { loginRoute } from "./routes/LoginRoute";
import { userRoute } from "./routes/UserRoute";

const app = express();
app.use(cookieParser());

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = ["http://localhost:3000", "https://f176564043f1.ngrok-free.app"];
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
