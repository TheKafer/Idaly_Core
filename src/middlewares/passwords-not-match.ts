import { Request, Response, NextFunction } from "express";
import { PasswordNotMatch } from "../errors/passwords-no-match";

export const validatePasswords = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.body.password !== req.body.confirmationPassword) throw new PasswordNotMatch;

    next();
};
