import express, { NextFunction, Request, Response } from 'express';
import { PORT } from './core/config';
import { signUpSchema } from './types/user.type';
import { validateData } from './middleware/validator.middleware';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/error-handling.middleware';
import { morganMiddleware } from './middleware/morgan.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware)
app.use(errorHandler)

app.get('/', (_req: Request, res: Response) => res.send('Hello World!'));

app.post('/sign-up', validateData(signUpSchema), (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(201).send('User created');
    } catch (error: any) {
        next(error);
    }
});

app.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}`));


