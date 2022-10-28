import { Request, Response, NextFunction } from 'express';
interface UserPayload {
    id: string;
    email: string;
    user: string;
    expirationTime: number;
}
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}
export declare const currentUser: (req: Request, res: Response, next: NextFunction) => void;
export {};
