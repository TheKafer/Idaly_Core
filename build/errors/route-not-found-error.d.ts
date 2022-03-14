import { BaseError } from "./base-error";
export declare class RouteNotFoundError extends BaseError {
    statusCode: number;
    constructor();
    serializeErros(): {
        message: string;
    }[];
}
