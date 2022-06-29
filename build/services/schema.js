"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaManager = void 0;
const bad_request_error_1 = require("../errors/bad-request-error");
class SchemaManager {
    static compare(schema, suppliedJson, errors = []) {
        if (!(SchemaManager.isJson(schema) && SchemaManager.isJson(suppliedJson)))
            throw new bad_request_error_1.BadRequestError('The object is not JSON');
        const validKeys = Object.keys(schema);
        const receivedKeys = Object.keys(suppliedJson);
        if (!(validKeys.length === receivedKeys.length && validKeys.every(value => receivedKeys.indexOf(value) != -1)))
            throw new bad_request_error_1.BadRequestError('The JSON does not follow the schema');
        for (let i = 0; i < receivedKeys.length; i++) {
            let field = SchemaManager.getFieldOfSchema(schema[receivedKeys[i]]);
            if (SchemaManager.isArray(suppliedJson[receivedKeys[i]])) {
                let array = suppliedJson[receivedKeys[i]];
                for (let j = 0; j < array.length; j++) {
                    if (SchemaManager.isJson(array[j])) {
                        if (field == 'JSON') {
                            errors.concat(SchemaManager.compare(schema[receivedKeys[i]][0], array[j], errors));
                        }
                        else {
                            errors.push({
                                message: 'It has an element that is not a JSON',
                                param: receivedKeys[i]
                            });
                        }
                    }
                    else {
                        if (field == 'DATE') {
                            if (SchemaManager.getField(array[j]) != 'NUMBER') {
                                errors.push({
                                    message: 'It has a element that it should be a date with timestamp format',
                                    param: receivedKeys[i]
                                });
                            }
                            else {
                                if (array[j] < 0) {
                                    errors.push({
                                        message: 'It has a element that it should be a date with timestamp format',
                                        param: receivedKeys[i]
                                    });
                                }
                            }
                        }
                        else {
                            if (SchemaManager.getField(array[j]) != field) {
                                errors.push({
                                    message: `It has an element that is not a ${field}`,
                                    param: receivedKeys[i]
                                });
                            }
                        }
                    }
                }
            }
            else {
                if (SchemaManager.isJson(suppliedJson[receivedKeys[i]])) {
                    if (field == 'JSON') {
                        errors.concat(SchemaManager.compare(schema[receivedKeys[i]], suppliedJson[receivedKeys[i]], errors));
                    }
                    else {
                        errors.push({
                            message: 'It should be a JSON',
                            param: receivedKeys[i]
                        });
                    }
                }
                else {
                    if (field == 'DATE') {
                        if (SchemaManager.getField(suppliedJson[receivedKeys[i]]) != 'NUMBER') {
                            errors.push({
                                message: 'It should be a Date with timestamp format',
                                param: receivedKeys[i]
                            });
                        }
                        else {
                            if (suppliedJson[receivedKeys[i]] < 0) {
                                errors.push({
                                    message: 'It should be a Date with timestamp format',
                                    param: receivedKeys[i]
                                });
                            }
                        }
                    }
                    else {
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
    static validateSchema(schema, errors = []) {
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; i++) {
            if (SchemaManager.isArray(schema[keys[i]])) {
                if (schema[keys[i]].length === 1) {
                    if (SchemaManager.isJson(schema[keys[i]][0])) {
                        errors.concat(SchemaManager.validateSchema(schema[keys[i]][0], errors));
                    }
                    else {
                        if (SchemaManager.isString(schema[keys[i]][0])) {
                            if (!SchemaManager.isAllowedField(schema[keys[i]][0]))
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
                if (SchemaManager.isJson(schema[keys[i]])) {
                    errors.concat(SchemaManager.validateSchema(schema[keys[i]], errors));
                }
                else {
                    if (SchemaManager.isString(schema[keys[i]])) {
                        if (!SchemaManager.isAllowedField(schema[keys[i]]))
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
    static hasRepeatedKeys(keys) {
        let errors = [];
        for (let i = 0; keys.length; i++) {
            if (keys.filter(key => key == keys[i]).length > 1) {
                errors.push({
                    message: 'The JSON contains a repeated key',
                    param: keys[i]
                });
            }
        }
        return errors;
    }
    static getFieldOfSchema(obj) {
        let field;
        if (SchemaManager.isArray(obj)) {
            field = SchemaManager.getField(obj[0]) == 'JSON' ? 'JSON' : obj[0];
        }
        else {
            field = SchemaManager.getField(obj) == 'JSON' ? 'JSON' : obj;
        }
        return field;
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
exports.SchemaManager = SchemaManager;
