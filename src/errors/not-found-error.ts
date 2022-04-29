import { BaseError } from "./base-error";

export class NotFoundError extends BaseError{
    statusCode = 404;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErros() {
        return [{ message: this.message }];
    }
}
