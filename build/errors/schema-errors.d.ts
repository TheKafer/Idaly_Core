import { BaseError } from './base-error';
import { SchemaError } from './schema-error';
export declare class SchemaErrors extends BaseError {
    private errors;
    statusCode: number;
    constructor(errors: SchemaError[]);
    serializeErros(): {
        message: string;
        field: string | undefined;
    }[];
}
