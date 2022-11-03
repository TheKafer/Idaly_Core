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
    console.log('hi------');
    if (!req.session?.jwt) return next();
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
    if (payload.expirationTime > Date.now()) throw new NotAuthorizedError;
    if (!req.currentUser) throw new NotAuthorizedError;
    console.log('hello-----------');

    next();
};
