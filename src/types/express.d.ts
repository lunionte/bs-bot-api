import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload; // ou o tipo exato que você usa no payload
        }
    }
}
