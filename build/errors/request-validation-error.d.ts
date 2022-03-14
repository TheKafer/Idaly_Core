import { ValidationError } from 'express-validator';
import { BaseError } from './base-error';
export declare class RequestValidationError extends BaseError {
    private errors;
    statusCode: number;
    constructor(errors: ValidationError[]);
    serializeErros(): {
        message: any;
        field: string;
    }[];
}
