import { BaseError } from "./base-error";

export class EnvVariablesNotDefinedError extends BaseError {
    statusCode = 503;

    constructor(public message: string) {
        super('Error getting the env variables');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, EnvVariablesNotDefinedError.prototype);
    }

    serializeErros() {
        return [{message: this.message}]
    }
}