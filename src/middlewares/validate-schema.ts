import { Request, Response, NextFunction } from "express";
import { SchemaError } from "../errors/schema-error";
import { SchemaErrors } from "../errors/schema-errors";
import { JsonManager } from "../services/json";

export const validateSchemaRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { schema } = req.body;
    const errorsSchema = JsonManager.validateSchema(schema);

    const errors: SchemaError[] = [];

    for (let i = 0; i < errorsSchema.length; i++) errors.push(new SchemaError(errorsSchema[i]));

    if (errorsSchema.length > 0) throw new SchemaErrors(errors);

    next();
};
