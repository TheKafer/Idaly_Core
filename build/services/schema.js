"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaManager = void 0;
const bad_request_error_1 = require("../errors/bad-request-error");
const types_1 = require("../enums/types");
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
                errors.concat(SchemaManager.compareArray(receivedKeys[i], suppliedJson[receivedKeys[i]], schema[receivedKeys[i]], errors));
            }
            else {
                if (SchemaManager.isJson(suppliedJson[receivedKeys[i]])) {
                    if (field == types_1.Types.json) {
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
                    if (field == types_1.Types.date) {
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
    static compareArray(key, array, schemaArray, errors) {
        for (let i = 0; i < array.length; i++) {
            if (SchemaManager.isJson(schemaArray[0])) {
                if (SchemaManager.isJson(array[i])) {
                    errors.concat(SchemaManager.compare(array[i], schemaArray[0], errors));
                }
                else {
                    errors.push({
                        message: 'It has an element that is not a JSON',
                        param: key
                    });
                }
            }
            else if (SchemaManager.isArray(schemaArray[0])) {
                if (SchemaManager.isArray(array[i])) {
                    errors.concat(SchemaManager.compareArray(key, array[i], schemaArray[0], errors));
                }
                else {
                    errors.push({
                        message: 'It has an element that is not a Array',
                        param: key
                    });
                }
            }
            else if (schemaArray[0] == types_1.Types.date) {
                if (SchemaManager.isNumber(array[i]) && array[i] < 0) {
                    errors.push({
                        message: 'It has a element that it should be a date with timestamp format',
                        param: key
                    });
                }
            }
            else if (SchemaManager.getField(array[i]) != schemaArray[0]) {
                errors.push({
                    message: `It has an element that is not a ${schemaArray[0]}`,
                    param: key
                });
            }
        }
        return errors;
    }
    static validateSchema(schema, errors = []) {
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; i++) {
            if (SchemaManager.isArray(schema[keys[i]])) {
                SchemaManager.validateArrayOfSchema(schema[keys[i]], keys[i], errors);
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
    static validateArrayOfSchema(array, key, errors) {
        if (array.length === 1) {
            if (SchemaManager.isArray(array[0])) {
                errors.concat(SchemaManager.validateArrayOfSchema(array[0], key, errors));
            }
            else if (SchemaManager.isJson(array[0])) {
                errors.concat(SchemaManager.validateSchema(array[0], errors));
            }
            else if (SchemaManager.isString(array[0])) {
                if (!SchemaManager.isAllowedField(array[0]))
                    errors.push({
                        message: array[0],
                        param: key
                    });
            }
            else {
                errors.push({
                    message: array[0],
                    param: key
                });
            }
        }
        else {
            errors.push({
                message: 'The array contains more than one element',
                param: key
            });
        }
        return errors;
    }
    static getNodes(schema, nodes = [], level = 0) {
        const keys = Object.keys(schema);
        for (let i = 0; i < keys.length; i++) {
            if (SchemaManager.isArray(schema[keys[i]])) {
                if (SchemaManager.isJson(schema[keys[i]][0])) {
                    nodes.push({
                        name: keys[i],
                        level: level,
                        type: types_1.Types.json_array
                    });
                }
                else {
                    if (SchemaManager.isArray(schema[keys[i]][0])) {
                        nodes.push({
                            name: keys[i],
                            level: level,
                            type: types_1.Types.array_array
                        });
                    }
                    else {
                        if (schema[keys[i]][0] == types_1.Types.date) {
                            nodes.push({
                                name: keys[i],
                                level: level,
                                type: types_1.Types.date_array
                            });
                        }
                        if (schema[keys[i]][0] == types_1.Types.number) {
                            nodes.push({
                                name: keys[i],
                                level: level,
                                type: types_1.Types.number_array
                            });
                        }
                        if (schema[keys[i]][0] == types_1.Types.string) {
                            nodes.push({
                                name: keys[i],
                                level: level,
                                type: types_1.Types.string_array
                            });
                        }
                        if (schema[keys[i]][0] == types_1.Types.boolean) {
                            nodes.push({
                                name: keys[i],
                                level: level,
                                type: types_1.Types.boolean_array
                            });
                        }
                    }
                }
            }
            else {
                if (SchemaManager.isJson(schema[keys[i]])) {
                    nodes.concat(SchemaManager.getNodes(schema[keys[i]], nodes, level++));
                }
                else {
                    nodes.push({
                        name: keys[i],
                        level: level,
                        type: schema[keys[i]]
                    });
                }
            }
        }
        return nodes;
    }
    static getFieldOfSchema(obj) {
        let field;
        if (SchemaManager.isArray(obj)) {
            field = SchemaManager.getField(obj[0]) == types_1.Types.json ? types_1.Types.json : obj[0];
        }
        else {
            field = SchemaManager.getField(obj) == types_1.Types.json ? types_1.Types.json : obj;
        }
        return field;
    }
    static getField(obj) {
        if (this.isNumber(obj))
            return types_1.Types.number;
        if (this.isString(obj))
            return types_1.Types.string;
        if (this.isBoolean(obj))
            return types_1.Types.boolean;
        if (this.isJson(obj))
            return types_1.Types.json;
        if (this.isArray(obj)) {
            if (this.isNumber(obj[0]))
                return types_1.Types.number_array;
            if (this.isString(obj[0]))
                return types_1.Types.string_array;
            if (this.isBoolean(obj[0]))
                return types_1.Types.boolean_array;
            if (this.isJson(obj[0]))
                return types_1.Types.json_array;
            if (this.isArray(obj[0]))
                return types_1.Types.array_array;
        }
        ;
        throw new Error('The Field is not supported');
    }
    static isAllowedField(obj) {
        return obj.toUpperCase() == types_1.Types.number || obj.toUpperCase() == types_1.Types.string || obj.toUpperCase() == types_1.Types.date || obj.toUpperCase() == types_1.Types.boolean;
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
