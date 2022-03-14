"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizedError = void 0;
const base_error_1 = require("./base-error");
class NotAuthorizedError extends base_error_1.BaseError {
    constructor() {
        super('Not Authorized');
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErros() {
        return [{ message: 'Not Authorized' }];
    }
}
exports.NotAuthorizedError = NotAuthorizedError;
