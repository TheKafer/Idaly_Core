import { BaseError } from "./base-error";
export declare class NotFoundError extends BaseError {
    statusCode: number;
    constructor();
    serializeErros(): {
        message: string;
    }[];
}
