import { BaseError } from "./base-error";
export declare class PasswordNotMatch extends BaseError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErros(): {
        message: string;
    }[];
}
