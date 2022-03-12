import { BaseError } from "./base-error";

export class DatabaseConnectionError extends BaseError {
    statusCode = 503;
    reason = 'Error connecting to database'

    constructor() {
        super('Error connecting to database');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErros() {
        return [
            {message: this.reason}
        ];
    }
}
