"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const base_error_1 = require("./base-error");
class NotFoundError extends base_error_1.BaseError {
    constructor() {
        super('Route not found');
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError);
    }
    serializeErros() {
        return [{ message: 'Not FOund' }];
    }
}
exports.NotFoundError = NotFoundError;
