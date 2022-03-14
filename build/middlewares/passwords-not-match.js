"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswords = void 0;
const passwords_no_match_1 = require("../errors/passwords-no-match");
const validatePasswords = (req, res, next) => {
    if (req.body.password !== req.body.confirmationPassword)
        throw new passwords_no_match_1.PasswordNotMatch;
    next();
};
exports.validatePasswords = validatePasswords;
