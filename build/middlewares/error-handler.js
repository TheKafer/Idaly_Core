"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const base_error_1 = require("../errors/base-error");
const errorHandler = (err, req, res, next) => {
    if (err instanceof base_error_1.BaseError) {
        return res.status(err.statusCode).send({ errors: err.serializeErros() });
    }
    else {
        console.log('Uncontrolled Error:');
        console.log(err);
    }
    res.status(400).send({
        errors: [{ message: 'Something went wrong' }]
    });
};
exports.errorHandler = errorHandler;
