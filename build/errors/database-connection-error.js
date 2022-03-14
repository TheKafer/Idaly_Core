"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionError = void 0;
const base_error_1 = require("./base-error");
class DatabaseConnectionError extends base_error_1.BaseError {
    constructor() {
        super('Error connecting to database');
        this.statusCode = 503;
        this.reason = 'Error connecting to database';
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErros() {
        return [
            { message: this.reason }
        ];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
