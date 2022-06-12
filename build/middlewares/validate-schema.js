"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaRequest = void 0;
const schema_error_1 = require("../errors/schema-error");
const schema_errors_1 = require("../errors/schema-errors");
const json_1 = require("../services/json");
const validateSchemaRequest = (req, res, next) => {
    const { schema } = req.body;
    const errorsSchema = json_1.JsonManager.validateSchema(schema);
    const errors = [];
    for (let i = 0; i < errorsSchema.length; i++)
        errors.push(new schema_error_1.SchemaError(errorsSchema[i]));
    if (errorsSchema.length > 0)
        throw new schema_errors_1.SchemaErrors(errors);
    next();
};
exports.validateSchemaRequest = validateSchemaRequest;
