import { SchemaErrorInterface } from "../interfaces/schema-error";
export declare class JsonManager {
    static compare(schema: any, suppliedJson: any, errors?: string[]): any[];
    static validateSchema(schema: any, errors?: SchemaErrorInterface[]): SchemaErrorInterface[];
    static getField(obj: any): string;
    static isAllowedField(obj: string): boolean;
    static isJson(obj: any): boolean;
    static isArray(obj: any): boolean;
    static isNumber(obj: any): boolean;
    static isBoolean(obj: any): boolean;
    static isString(obj: any): boolean;
}
