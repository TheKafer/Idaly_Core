import { BadRequestError } from "../errors/bad-request-error";

export class JsonManager {
    static compare(schema: any, suppliedJson: any): boolean {
        if (JsonManager.isJson(schema) && JsonManager.isJson(suppliedJson)) throw new BadRequestError('The objects are not JSON');

        const validKeys = Object.keys(schema);
        const receivedKeys = Object.keys(suppliedJson);


        if (validKeys.length === receivedKeys.length && validKeys.every(value => receivedKeys.indexOf(value))) {
            for (let i = 0; i < receivedKeys.length; i++) {
                if (JsonManager.isJson(suppliedJson[receivedKeys[i]])) {
                    return JsonManager.compare(suppliedJson[receivedKeys[i]], schema[receivedKeys[i]]);
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
                    if (JsonManager.isJson(schema[keys[i]][0])) return JsonManager.validateSchema(schema[keys[i]][0]);
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    static isJson(obj: any): boolean {
        return obj !== undefined && obj !== null && obj.constructor == Object;
    }

    static isArray(obj: any) {
        return obj !== undefined && obj !== null && obj.constructor == Array;
    }
}
