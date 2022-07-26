import { BadRequestError } from "../errors/bad-request-error";
import { SchemaErrorInterface } from "../interfaces/schema-error";
import { Types } from "../enums/types";

export class SchemaManager {
    static compare(schema: any, suppliedJson: any, errors: SchemaErrorInterface[] = []): SchemaErrorInterface[] {
        if (!(SchemaManager.isJson(schema) && SchemaManager.isJson(suppliedJson))) throw new BadRequestError('The object is not JSON');

        const validKeys = Object.keys(schema);
        const receivedKeys = Object.keys(suppliedJson);

        if (!(validKeys.length === receivedKeys.length && validKeys.every(value => receivedKeys.indexOf(value) != -1))) throw new BadRequestError('The JSON does not follow the schema');

        for (let i = 0; i < receivedKeys.length; i++) {
            let field = SchemaManager.getFieldOfSchema(schema[receivedKeys[i]]);
        
            if(SchemaManager.isArray(suppliedJson[receivedKeys[i]])) {
                errors.concat(SchemaManager.compareArray(receivedKeys[i], suppliedJson[receivedKeys[i]], schema[receivedKeys[i]], errors));
            } else {
                if(SchemaManager.isJson(suppliedJson[receivedKeys[i]])) {
                    if (field == Types.json) {
                        errors.concat(SchemaManager.compare(schema[receivedKeys[i]], suppliedJson[receivedKeys[i]], errors));
                    } else {
                        errors.push({
                            message: 'It should be a JSON',
                            param: receivedKeys[i]
                        });
                    }
                } else {
                    if (field == Types.date) {
                        if (SchemaManager.getField(suppliedJson[receivedKeys[i]]) != 'NUMBER') {
                            errors.push({
                                message: 'It should be a Date with timestamp format',
                                param: receivedKeys[i]
                            });
                        } else {
                            if (suppliedJson[receivedKeys[i]] < 0) {
                                errors.push({
                                    message: 'It should be a Date with timestamp format',
                                    param: receivedKeys[i]
                                });
                            }
                        }
                    } else {
                        if (SchemaManager.getField(suppliedJson[receivedKeys[i]]) != field) {
                            errors.push({
                                message: `It should be a ${field}`,
                                param: receivedKeys[i]
                            });
                        }
                    }
                }
            }
        }

        return errors;
    }

    static compareArray(key: string, array: any[], schemaArray: any[], errors: SchemaErrorInterface[]): SchemaErrorInterface[] {
        for (let i = 0; i < array.length; i++) {
            if (SchemaManager.isJson(schemaArray[0])) {
                if (SchemaManager.isJson(array[i])) {
                    errors.concat(SchemaManager.compare(schemaArray[0], array[i],errors));
                } else {
                    errors.push({
                        message: 'It has an element that is not a JSON',
                        param: key
                    });
                }
            } else if (SchemaManager.isArray(schemaArray[0])) {
                if (SchemaManager.isArray(array[i])) {
                    errors.concat(SchemaManager.compareArray(key, array[i], schemaArray[0], errors));
                } else {
                    errors.push({
                        message: 'It has an element that is not a Array',
                        param: key
                    });
                }
            } else if (schemaArray[0] == Types.date) {
                if (SchemaManager.isNumber(array[i]) && array[i] < 0) {
                    errors.push({
                        message: 'It has a element that it should be a date with timestamp format',
                        param: key
                    });
                }
            } else if (SchemaManager.getField(array[i]) != schemaArray[0]) {
                errors.push({
                    message: `It has an element that is not a ${schemaArray[0]}`,
                    param: key
                });
            }
        }

        return errors;
    }

    static validateSchema(schema: any, errors: SchemaErrorInterface[] = []): SchemaErrorInterface[] {
        const keys = Object.keys(schema);

        for (let i = 0; i < keys.length; i++) {
            if(SchemaManager.isArray(schema[keys[i]])) {
                SchemaManager.validateArrayOfSchema(schema[keys[i]], keys[i], errors);
            } else {
                if (SchemaManager.isJson(schema[keys[i]])) {
                    errors.concat(SchemaManager.validateSchema(schema[keys[i]], errors));
                } else {
                    if (SchemaManager.isString(schema[keys[i]])) {
                        if (!SchemaManager.isAllowedField(schema[keys[i]])) errors.push({
                            message: schema[keys[i]],
                            param: keys[i]
                        });
                    } else {
                        errors.push({
                            message: schema[keys[i]],
                            param: keys[i]
                        });
                    }
                }
            }
        }

        return errors;
    }

    static validateArrayOfSchema (array: any[], key: string, errors: SchemaErrorInterface[]): SchemaErrorInterface[] {
        if (array.length === 1) {
            if (SchemaManager.isArray(array[0])) {
                errors.concat(SchemaManager.validateArrayOfSchema(array[0], key, errors));
            } else if (SchemaManager.isJson(array[0])) {
                errors.concat(SchemaManager.validateSchema(array[0], errors));
            } else if (SchemaManager.isString(array[0])) {
                if (!SchemaManager.isAllowedField(array[0])) errors.push({
                    message: array[0],
                    param: key
                });
            } else {
                errors.push({
                    message: array[0],
                    param: key
                });
            }
        } else {
            if (array.length === 0) {
                errors.push({
                    message: 'The array is empty',
                    param: key
                });
            } else {
                errors.push({
                    message: 'The array contains more than one element',
                    param: key
                });
            }
        }

        return errors;
    }

    static getFieldOfSchema(obj: any): string {
        let field;
        if (SchemaManager.isArray(obj)) {
            field = SchemaManager.getField(obj[0]) == Types.json ? Types.json : obj[0];
        } else {
            field = SchemaManager.getField(obj) == Types.json ? Types.json : obj;
        }
        return field;
    }

    static getField(obj: any): string {
        if (this.isNumber(obj)) return Types.number;
        if (this.isString(obj)) return Types.string;
        if (this.isBoolean(obj)) return Types.boolean;
        if (this.isJson(obj)) return Types.json;
        if (this.isArray(obj)) {
            if (this.isNumber(obj[0])) return Types.number_array;
            if (this.isString(obj[0])) return Types.string_array;
            if (this.isBoolean(obj[0])) return Types.boolean_array;
            if (this.isJson(obj[0])) return Types.json_array;
            if (this.isArray(obj[0])) return Types.array_array;
        };

        throw new Error('The Field is not supported');
    }

    static isAllowedField(obj: string): boolean {
        return obj.toUpperCase() == Types.number || obj.toUpperCase() == Types.string || obj.toUpperCase() == Types.date || obj.toUpperCase() == Types.boolean;
    }

    static isJson(obj: any): boolean {
        return obj !== undefined && obj !== null && obj.constructor == Object;
    }

    static isArray(obj: any) {
        return obj !== undefined && obj !== null && obj.constructor == Array;
    }

    static isNumber(obj: any) {
        return obj !== undefined && obj !== null && obj.constructor == Number;
    }

    static isBoolean(obj: any){
        return obj !== undefined && obj !== null && obj.constructor == Boolean;
    }

    static isString(obj: any) {
        return obj !== undefined && obj !== null && obj.constructor == String;
    }
}
