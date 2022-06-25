import { BadRequestError } from "../errors/bad-request-error";
import { SchemaErrorInterface } from "../interfaces/schema-error";

export class JsonManager {
    static compare(schema: any, suppliedJson: any, errors: SchemaErrorInterface[] = []): SchemaErrorInterface[] {
        if (!(JsonManager.isJson(schema) && JsonManager.isJson(suppliedJson))) throw new BadRequestError('The object is not JSON');

        const validKeys = Object.keys(schema);
        const receivedKeys = Object.keys(suppliedJson);

        if (!(validKeys.length === receivedKeys.length && validKeys.every(value => receivedKeys.indexOf(value) != -1))) throw new BadRequestError('The JSON does not follow the schema');

        for (let i = 0; i < receivedKeys.length; i++) {
            let field = JsonManager.getFieldOfSchema(schema[receivedKeys[i]]);
        
            if(JsonManager.isArray(suppliedJson[receivedKeys[i]])) {
                let array = suppliedJson[receivedKeys[i]];

                for (let j = 0; j < array.length; j++) {
                    if (JsonManager.isJson(array[j])) {
                        if (field == 'JSON') {
                            errors.concat(JsonManager.compare(schema[receivedKeys[i]][0], array[j], errors));
                        } else {
                            errors.push({
                                message: 'It has an element that is not a JSON',
                                param: receivedKeys[i]
                            });
                        }
                    } else {
                        if (field == 'DATE') {
                            if (JsonManager.getField(array[j]) != 'NUMBER') {
                                errors.push({
                                    message: 'It has a element that it should be a date with timestamp format',
                                    param: receivedKeys[i]
                                });
                            } else {
                                if (array[j] < 0) {
                                    errors.push({
                                        message: 'It has a element that it should be a date with timestamp format',
                                        param: receivedKeys[i]
                                    });
                                }
                            }
                        } else {
                            if (JsonManager.getField(array[j]) != field) {
                                errors.push({
                                    message: `It has an element that is not a ${field}`,
                                    param: receivedKeys[i]
                                });
                            }
                        }
                    }
                }
            } else {
                if(JsonManager.isJson(suppliedJson[receivedKeys[i]])) {
                    if (field == 'JSON') {
                        errors.concat(JsonManager.compare(schema[receivedKeys[i]], suppliedJson[receivedKeys[i]], errors));
                    } else {
                        errors.push({
                            message: 'It should be a JSON',
                            param: receivedKeys[i]
                        });
                    }
                } else {
                    if (field == 'DATE') {
                        if (JsonManager.getField(suppliedJson[receivedKeys[i]]) != 'NUMBER') {
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
                        if (JsonManager.getField(suppliedJson[receivedKeys[i]]) != field) {
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

    static validateSchema(schema: any, errors: SchemaErrorInterface[] = []): SchemaErrorInterface[] {
        const keys = Object.keys(schema);

        for (let i = 0; i < keys.length; i++) {
            if(JsonManager.isArray(schema[keys[i]])) {
                if (schema[keys[i]].length === 1) {
                    if (JsonManager.isJson(schema[keys[i]][0])) {
                        errors.concat(JsonManager.validateSchema(schema[keys[i]][0], errors));
                    } else {
                        if (JsonManager.isString(schema[keys[i]][0])) {
                            if (!JsonManager.isAllowedField(schema[keys[i]][0])) errors.push({
                                message: schema[keys[i]][0],
                                param: keys[i]
                            });
                        } else {
                            errors.push({
                                message: schema[keys[i]][0],
                                param: keys[i]
                            });
                        }
                    }
                } else {
                    errors.push({
                        message: schema[keys[i]],
                        param: keys[i]
                    });
                }
            } else {
                if (JsonManager.isJson(schema[keys[i]])) {
                    errors.concat(JsonManager.validateSchema(schema[keys[i]], errors));
                } else {
                    if (JsonManager.isString(schema[keys[i]])) {
                        if (!JsonManager.isAllowedField(schema[keys[i]])) errors.push({
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

    static getFieldOfSchema(obj: any): string {
        let field;
        if (JsonManager.isArray(obj)) {
            field = JsonManager.getField(obj[0]) == 'JSON' ? 'JSON' : obj[0];
        } else {
            field = JsonManager.getField(obj) == 'JSON' ? 'JSON' : obj;
        }
        return field;
    }

    static getField(obj: any): string {
        if (this.isNumber(obj)) return 'NUMBER';
        if (this.isString(obj)) return 'STRING';
        if (this.isBoolean(obj)) return 'BOOLEAN';
        if (this.isJson(obj)) return 'JSON';
        if (this.isArray(obj)) return 'ARRAY';

        throw new Error('The Field is not supported');
    }

    static isAllowedField(obj: string): boolean {
        return obj.toUpperCase() == 'NUMBER' || obj.toUpperCase() == 'STRING' || obj.toUpperCase() == 'DATE' || obj.toUpperCase() == 'BOOLEAN';
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
