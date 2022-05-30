import { BadRequestError } from "../errors/bad-request-error";

export class JsonManager {
    static compare(schema: any, suppliedJson: any): boolean {
        if (JsonManager.isJson(schema) && JsonManager.isJson(suppliedJson)) throw new BadRequestError('The objects are not JSON');

        const validKeys = Object.keys(schema);
        const receivedKeys = Object.keys(suppliedJson);


        if (validKeys.length === receivedKeys.length && validKeys.every(value => receivedKeys.indexOf(value))) {
            for (let i = 0; i < receivedKeys.length; i++) {
                if (JsonManager.isJson(suppliedJson[receivedKeys[i]])) {
                    return JsonManager.compare(schema[receivedKeys[i]], suppliedJson[receivedKeys[i]]);
                }

                if (JsonManager.isArray(suppliedJson[receivedKeys[i]])) {
                    let suppliedArray = suppliedJson[receivedKeys[i]];
                    let validArray = schema[receivedKeys[i]];

                    const typeField = validArray[0];

                    for (let j = 0; j < suppliedArray.length; j++) {
                        if (JsonManager.isJson(typeField)) {
                            return JsonManager.compare(schema[receivedKeys[i]][0], suppliedJson[receivedKeys[i]][j]);
                        } else {
                            if (typeField == 'DATE'){
                                if (JsonManager.getField(suppliedJson[receivedKeys[i]][j]) != 'NUMBER') return false;
                            } else {
                                if (typeField != JsonManager.getField(suppliedJson[receivedKeys[i]][j])) return false; 
                            }
                        }
                    }
                }

                const typeField = schema[receivedKeys[i]];

                if (typeField == 'DATE') {
                    if (JsonManager.getField(suppliedJson[receivedKeys[i]]) != 'NUMBER') return false;
                } else {
                    if (typeField != JsonManager.getField(suppliedJson[receivedKeys[i]])) return false; 
                }
            }
        } else {
            return false;
        }
        return true;
    }

    static validateSchema(schema: any): boolean {
        const keys = Object.keys(schema);

        for (let i = 0; i < keys.length; i++) {
            if(JsonManager.isArray(schema[keys[i]])) {
                if (schema[keys[i]].length === 1) {
                    if (JsonManager.isJson(schema[keys[i]][0])) {
                        return JsonManager.validateSchema(schema[keys[i]][0]);
                    } else {
                        if (JsonManager.isString(schema[keys[i]][0])) {
                            if (!JsonManager.isAllowedField(schema[keys[i]][0])) return false;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                if (JsonManager.isJson(schema[keys[i]])) {
                    return JsonManager.validateSchema(schema[keys[i]]);
                } else {
                    if (JsonManager.isString(schema[keys[i]])) {
                        if (!JsonManager.isAllowedField(schema[keys[i]])) return false;
                    } else {
                        return false;
                    }
                }
            }
        }
        return true;
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
