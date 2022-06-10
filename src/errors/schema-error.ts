import { SchemaErrorInterface } from "../interfaces/schema-error";
import { BaseError } from "./base-error";

export class SchemaError extends BaseError {
    statusCode = 400;
    field: string | undefined;

    constructor(private err: SchemaErrorInterface) {
        super(err.message);
        this.field = err.param;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, SchemaError.prototype);
    }

    serializeErros() {
        return [{message: this.err.message, field: this.err.param }]
    }
}
