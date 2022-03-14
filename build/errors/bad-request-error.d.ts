import { BaseError } from './base-error';
export declare class BadRequestError extends BaseError {
    message: string;
    statusCode: number;
    constructor(message: string);
    serializeErros(): {
        message: string;
    }[];
}
