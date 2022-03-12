import { BaseError } from "./base-error";

export class RouteNotFoundError extends BaseError {
    statusCode = 404;

    constructor() {
        super('Route not found');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, RouteNotFoundError.prototype);
    }

    serializeErros() {
        return [{ message: 'Route Not Found' }];
    }
}