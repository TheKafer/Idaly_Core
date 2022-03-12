import { BaseError } from './base-error';

export class BadRequestError extends BaseError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErros() {
        return [{message: this.message}]
    }
}
