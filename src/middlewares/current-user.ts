import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';

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

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) return next();

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        if (payload.expirationTime > Date.now()) throw new BadRequestError(' the session expired');

        req.currentUser = payload;
    } catch (err) {}

    next();
};
