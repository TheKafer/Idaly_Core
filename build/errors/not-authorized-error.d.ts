import { BaseError } from "./base-error";
export declare class NotAuthorizedError extends BaseError {
    statusCode: number;
    constructor();
    serializeErros(): {
        message: string;
    }[];
}
