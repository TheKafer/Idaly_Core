import { BaseError } from './base-error';
import { EquationError } from './equation-error';

export class EquationErrors extends BaseError {
    statusCode = 400;

    constructor(private errors: EquationError[]) {
        super('Invalid request parameters');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, EquationErrors.prototype);
    }

    serializeErros() {
        return this.errors.map(err => {
            return { message: err.message, field: err.field };
        });
    }
}
