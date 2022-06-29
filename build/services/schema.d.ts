import { SchemaErrorInterface } from "../interfaces/schema-error";
export declare class SchemaManager {
    static compare(schema: any, suppliedJson: any, errors?: SchemaErrorInterface[]): SchemaErrorInterface[];
    static validateSchema(schema: any, errors?: SchemaErrorInterface[]): SchemaErrorInterface[];
    static hasRepeatedKeys(keys: string[]): SchemaErrorInterface[];
    static getFieldOfSchema(obj: any): string;
    static getField(obj: any): string;
    static isAllowedField(obj: string): boolean;
    static isJson(obj: any): boolean;
    static isArray(obj: any): boolean;
    static isNumber(obj: any): boolean;
    static isBoolean(obj: any): boolean;
    static isString(obj: any): boolean;
}