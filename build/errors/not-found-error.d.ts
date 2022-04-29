import { BaseError } from "./base-error";
export declare class NotFoundError extends BaseError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErros(): {
        message: string;
    }[];
}
