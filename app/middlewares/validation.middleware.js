import { HTTP_STATUS_CODES } from "../config/constants.js";
import { check, validationResult } from 'express-validator';

const validationMiddleware = (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({errors: errors.array()});
    }
    return next();
};

export default validationMiddleware
