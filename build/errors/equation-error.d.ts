import { EquationErrorInterface } from "../interfaces/equation-error";
import { BaseError } from "./base-error";
export declare class EquationError extends BaseError {
    private err;
    statusCode: number;
    field: string | undefined;
    constructor(err: EquationErrorInterface);
    serializeErros(): {
        message: string;
        field: string | undefined;
    }[];
}
