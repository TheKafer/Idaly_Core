import { EquationErrorInterface } from "../interfaces/equation-error";
import { BaseError } from "./base-error";

export class EquationError extends BaseError {
    statusCode = 400;
    field: string | undefined;

    constructor(private err: EquationErrorInterface) {
        super(err.message);
        this.field = err.position;
        // Only because we are extending a built in class
        Object.setPrototypeOf(this, EquationError.prototype);
    }

    serializeErros() {
        return [{message: this.err.message, field: this.err.position }]
    }
}
