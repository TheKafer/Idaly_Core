"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const base_error_1 = require("./base-error");
class NotFoundError extends base_error_1.BaseError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErros() {
        return [{ message: this.message }];
    }
}
exports.NotFoundError = NotFoundError;
