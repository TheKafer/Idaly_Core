import { BaseError } from './base-error';
import { EquationError } from './equation-error';
export declare class EquationErrors extends BaseError {
    private errors;
    statusCode: number;
    constructor(errors: EquationError[]);
    serializeErros(): {
        message: string;
        field: string | undefined;
    }[];
}
