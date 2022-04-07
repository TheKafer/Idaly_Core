import { BaseError } from "./base-error";
export declare class EnvVariablesNotDefinedError extends BaseError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErros(): {
        message: string;
    }[];
}
