import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.auth_token;

    if (!token) {
        return res.status(401).json({ message: "Não autenticado" });
    }

    try {
        // payload = id, username, avatar, email etc
        // se o verify não der certo ele lança um erro
        const payload = jwt.verify(token, process.env.JWT_SECRET || "null");
        req.user = payload;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
};
