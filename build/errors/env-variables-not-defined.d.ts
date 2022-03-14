import { BaseError } from "./base-error";
export declare class EnvVariablesNotDefinedError extends BaseError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErros(): {
        message: string;
    }[];
}
