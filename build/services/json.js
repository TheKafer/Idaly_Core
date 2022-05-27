"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonManager = void 0;
const bad_request_error_1 = require("../errors/bad-request-error");
class JsonManager {
    static compare(schema, suppliedJson) {
        if (JsonManager.isJson(schema) && JsonManager.isJson(suppliedJson))
            throw new bad_request_error_1.BadRequestError('The objects are not JSON');
        const validKeys = Object.keys(schema);
        const receivedKeys = Object.keys(suppliedJson);
        if (validKeys.length === receivedKeys.length && validKeys.every(value => receivedKeys.indexOf(value))) {
            for (let i = 0; i < receivedKeys.length; i++) {
                if (JsonManager.isJson(suppliedJson[receivedKeys[i]])) {
                    return JsonManager.compare(suppliedJson[receivedKeys[i]], schema[receivedKeys[i]]);
                }
            }
        }
        else {
            return false;
        }
        return true;
    }
    static validateSchema(schema) {
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; i++) {
            if (JsonManager.isArray(schema[keys[i]])) {
                if (schema[keys[i]].length === 1) {
                    if (JsonManager.isJson(schema[keys[i]][0]))
                        return JsonManager.validateSchema(schema[keys[i]][0]);
                }
                else {
                    return false;
                }
            }
        }
        return true;
    }
    static isJson(obj) {
        return obj !== undefined && obj !== null && obj.constructor == Object;
    }
    static isArray(obj) {
        return obj !== undefined && obj !== null && obj.constructor == Array;
    }
}
exports.JsonManager = JsonManager;
