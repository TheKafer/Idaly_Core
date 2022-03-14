"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const base_error_1 = require("./base-error");
class BadRequestError extends base_error_1.BaseError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErros() {
        return [{ message: this.message }];
    }
}
exports.BadRequestError = BadRequestError;
