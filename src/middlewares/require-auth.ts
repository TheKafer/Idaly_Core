import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
    user: string;
    expirationTime: number;
}

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session?.jwt) {
        throw new NotAuthorizedError;
    }
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    if (payload.expirationTime < Date.now()) {
        req.session = null;
        throw new NotAuthorizedError;
    }

    next();
};
