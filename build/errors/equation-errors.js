"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquationErrors = void 0;
const base_error_1 = require("./base-error");
class EquationErrors extends base_error_1.BaseError {
    constructor(errors) {
        super('Invalid request parameters');
        this.errors = errors;
        this.statusCode = 400;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, EquationErrors.prototype);
    }
    serializeErros() {
        return this.errors.map(err => {
            return { message: err.message, field: err.field };
        });
    }
}
exports.EquationErrors = EquationErrors;
