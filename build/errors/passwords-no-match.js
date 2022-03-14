"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordNotMatch = void 0;
const base_error_1 = require("./base-error");
class PasswordNotMatch extends base_error_1.BaseError {
    constructor() {
        super('Passwords do not match');
        this.statusCode = 401;
        this.reason = 'Passwords do not match';
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, PasswordNotMatch.prototype);
    }
    serializeErros() {
        return [
            { message: this.reason }
        ];
    }
}
exports.PasswordNotMatch = PasswordNotMatch;
