import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { loginRoute } from "./routes/LoginRoute";

const app = express();
app.use(express.json());

app.use("/api", loginRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
