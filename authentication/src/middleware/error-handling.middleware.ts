import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';
import { NODE_ENV } from '../core/config';

type ResponseType = {
    message?: string;
};

/**
 * Error handler middleware
 * @param err - Error object
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const response: ResponseType = {};
    if (err.message) {
        const logs = {
            type: err.name,
            message: err.message,
            method: req.method,
            path: req.path,
            params: req.route.path,
            body: req.body,
            query: req.query,
            stack: err.stack
        };
        logger.error(JSON.stringify(logs));
        response.message = NODE_ENV === 'development'
            ? err.message
            : 'Something wrong!';
    }

    res.status(422).send(response);
}
