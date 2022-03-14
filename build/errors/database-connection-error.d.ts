import { BaseError } from "./base-error";
export declare class DatabaseConnectionError extends BaseError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErros(): {
        message: string;
    }[];
}
