"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaError = void 0;
const base_error_1 = require("./base-error");
class SchemaError extends base_error_1.BaseError {
    constructor(err) {
        super(err.message);
        this.err = err;
        this.statusCode = 400;
        this.field = err.param;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, SchemaError.prototype);
    }
    serializeErros() {
        return [{ message: this.err.message, field: this.err.param }];
    }
}
exports.SchemaError = SchemaError;
