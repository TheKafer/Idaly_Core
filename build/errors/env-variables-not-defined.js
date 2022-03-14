"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvVariablesNotDefinedError = void 0;
const base_error_1 = require("./base-error");
class EnvVariablesNotDefinedError extends base_error_1.BaseError {
    constructor() {
        super('Error getting the env variables');
        this.statusCode = 503;
        this.reason = 'Error getting the env variables';
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, EnvVariablesNotDefinedError.prototype);
    }
    serializeErros() {
        return [
            { message: this.reason }
        ];
    }
}
exports.EnvVariablesNotDefinedError = EnvVariablesNotDefinedError;
