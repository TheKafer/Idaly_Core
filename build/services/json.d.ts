export declare class JsonManager {
    static compare(schema: any, suppliedJson: any): boolean;
    static validateSchema(schema: any): any[];
    static getField(obj: any): string;
    static isAllowedField(obj: string): boolean;
    static isJson(obj: any): boolean;
    static isArray(obj: any): boolean;
    static isNumber(obj: any): boolean;
    static isBoolean(obj: any): boolean;
    static isString(obj: any): boolean;
}
