import { BaseError } from './base-error';
import { SchemaError } from './schema-error';

export class SchemaErrors extends BaseError {
    statusCode = 400;

    constructor(private errors: SchemaError[]) {
        super('Invalid request parameters');
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, SchemaErrors.prototype);
    }

    serializeErros() {
        return this.errors.map(err => {
            return { message: err.message, field: err.field };
        });
    }
}
