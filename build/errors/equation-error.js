"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquationError = void 0;
const base_error_1 = require("./base-error");
class EquationError extends base_error_1.BaseError {
    constructor(err) {
        super(err.message);
        this.err = err;
        this.statusCode = 400;
        this.field = err.position;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, EquationError.prototype);
    }
    serializeErros() {
        return [{ message: this.err.message, field: this.err.position }];
    }
}
exports.EquationError = EquationError;
