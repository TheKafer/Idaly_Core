"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteNotFoundError = void 0;
const base_error_1 = require("./base-error");
class RouteNotFoundError extends base_error_1.BaseError {
    constructor() {
        super('Route not found');
        this.statusCode = 404;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RouteNotFoundError.prototype);
    }
    serializeErros() {
        return [{ message: 'Route Not Found' }];
    }
}
exports.RouteNotFoundError = RouteNotFoundError;
