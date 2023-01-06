"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt))
        return next();
    const payload = jsonwebtoken_1.default.verify(req.session.jwt, process.env.JWT_KEY);
    if (payload.expirationTime < Date.now())
        throw new not_authorized_error_1.NotAuthorizedError;
    next();
};
exports.requireAuth = requireAuth;
