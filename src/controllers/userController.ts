import { Request, Response } from "express";

export class UserController {
    static async getMe(req: Request, res: Response) {
        return res.json({ user: req.user });
    }
}
