"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonManager = void 0;
const bad_request_error_1 = require("../errors/bad-request-error");
class JsonManager {
    static compare(schema, suppliedJson, errors = []) {
        if (JsonManager.isJson(schema) && JsonManager.isJson(suppliedJson))
            throw new bad_request_error_1.BadRequestError('The objects are not JSON');
        const validKeys = Object.keys(schema);
        const receivedKeys = Object.keys(suppliedJson);
        if (!(validKeys.length === receivedKeys.length && validKeys.every(value => receivedKeys.indexOf(value))))
            throw new bad_request_error_1.BadRequestError('The JSONs are not equal');
        for (let i = 0; i < receivedKeys.length; i++) {
            let object = schema[receivedKeys[i]];
            if (JsonManager.isArray(suppliedJson[receivedKeys[i]])) {
                let array = suppliedJson[receivedKeys[i]];
                for (let j = 0; j < array.length; j++) {
                    if (JsonManager.isJson(array[j])) {
                        if (object == 'JSON') {
                            errors.concat(JsonManager.compare(schema[receivedKeys[i]][0], array[j], errors));
                        }
                        else {
                            errors.push(array[j]);
                        }
                    }
                    else {
                        if (JsonManager.getField(array[j]) != object)
                            errors.push(array[j]);
                    }
                }
            }
            else {
                if (JsonManager.isJson(suppliedJson[receivedKeys[i]])) {
                    if (object == 'JSON') {
                        errors.concat(JsonManager.compare(schema[receivedKeys[i]], suppliedJson[receivedKeys[i]], errors));
                    }
                    else {
                        errors.push(suppliedJson[receivedKeys[i]]);
                    }
                }
                else {
                    if (JsonManager.getField(suppliedJson[receivedKeys[i]]) != object)
                        errors.push(suppliedJson[receivedKeys[i]]);
                }
            }
        }
        return errors;
    }
    static validateSchema(schema, errors = []) {
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; i++) {
            if (JsonManager.isArray(schema[keys[i]])) {
                if (schema[keys[i]].length === 1) {
                    if (JsonManager.isJson(schema[keys[i]][0])) {
                        errors.concat(JsonManager.validateSchema(schema[keys[i]][0], errors));
                    }
                    else {
                        if (JsonManager.isString(schema[keys[i]][0])) {
                            if (!JsonManager.isAllowedField(schema[keys[i]][0]))
                                errors.push({
                                    message: schema[keys[i]][0],
                                    param: keys[i]
                                });
                        }
                        else {
                            errors.push({
                                message: schema[keys[i]][0],
                                param: keys[i]
                            });
                        }
                    }
                }
                else {
                    errors.push({
                        message: schema[keys[i]],
                        param: keys[i]
                    });
                }
            }
            else {
                if (JsonManager.isJson(schema[keys[i]])) {
                    errors.concat(JsonManager.validateSchema(schema[keys[i]], errors));
                }
                else {
                    if (JsonManager.isString(schema[keys[i]])) {
                        if (!JsonManager.isAllowedField(schema[keys[i]]))
                            errors.push({
                                message: schema[keys[i]],
                                param: keys[i]
                            });
                    }
                    else {
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
    static getField(obj) {
        if (this.isNumber(obj))
            return 'NUMBER';
        if (this.isString(obj))
            return 'STRING';
        if (this.isBoolean(obj))
            return 'BOOLEAN';
        if (this.isJson(obj))
            return 'JSON';
        if (this.isArray(obj))
            return 'ARRAY';
        throw new Error('The Field is not supported');
    }
    static isAllowedField(obj) {
        return obj.toUpperCase() == 'NUMBER' || obj.toUpperCase() == 'STRING' || obj.toUpperCase() == 'DATE' || obj.toUpperCase() == 'BOOLEAN';
    }
    static isJson(obj) {
        return obj !== undefined && obj !== null && obj.constructor == Object;
    }
    static isArray(obj) {
        return obj !== undefined && obj !== null && obj.constructor == Array;
    }
    static isNumber(obj) {
        return obj !== undefined && obj !== null && obj.constructor == Number;
    }
    static isBoolean(obj) {
        return obj !== undefined && obj !== null && obj.constructor == Boolean;
    }
    static isString(obj) {
        return obj !== undefined && obj !== null && obj.constructor == String;
    }
}
exports.JsonManager = JsonManager;
