"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvVariablesNotDefinedError = void 0;
const base_error_1 = require("./base-error");
class EnvVariablesNotDefinedError extends base_error_1.BaseError {
    constructor(message) {
        super('Error getting the env variables');
        this.message = message;
        this.statusCode = 503;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, EnvVariablesNotDefinedError.prototype);
    }
    serializeErros() {
        return [{ message: this.message }];
    }
}
exports.EnvVariablesNotDefinedError = EnvVariablesNotDefinedError;
