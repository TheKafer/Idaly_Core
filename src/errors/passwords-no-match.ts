import { BaseError } from "./base-error";

export class PasswordNotMatch extends BaseError {
    statusCode = 401;
    reason = 'Passwords do not match'

    constructor() {
        super('Passwords do not match');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, PasswordNotMatch.prototype);
    }

    serializeErros() {
        return [
            {message: this.reason}
        ];
    }
}
