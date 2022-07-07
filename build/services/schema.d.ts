import { SchemaErrorInterface } from "../interfaces/schema-error";
import { Node } from "../interfaces/node";
export declare class SchemaManager {
    static compare(schema: any, suppliedJson: any, errors?: SchemaErrorInterface[]): SchemaErrorInterface[];
    static compareArray(key: string, array: any[], schemaArray: any[], errors: SchemaErrorInterface[]): SchemaErrorInterface[];
    static validateSchema(schema: any, errors?: SchemaErrorInterface[]): SchemaErrorInterface[];
    static validateArrayOfSchema(array: any[], key: string, errors: SchemaErrorInterface[]): SchemaErrorInterface[];
    static getNodes(schema: any, nodes?: Node[], level?: number): Node[];
    static getFieldOfSchema(obj: any): string;
    static getField(obj: any): string;
    static isAllowedField(obj: string): boolean;
    static isJson(obj: any): boolean;
    static isArray(obj: any): boolean;
    static isNumber(obj: any): boolean;
    static isBoolean(obj: any): boolean;
    static isString(obj: any): boolean;
}
