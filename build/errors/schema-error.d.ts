import { SchemaErrorInterface } from "../interfaces/schema-error";
import { BaseError } from "./base-error";
export declare class SchemaError extends BaseError {
    private err;
    statusCode: number;
    field: string | undefined;
    constructor(err: SchemaErrorInterface);
    serializeErros(): {
        message: string;
        field: string | undefined;
    }[];
}
