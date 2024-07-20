import express, { NextFunction, Request, Response } from 'express';
import { JWT_EXPIRATION, PORT } from './core/config';
import { signUpSchema } from './types/user.type';
import { validateData } from './middleware/validator.middleware';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/error-handling.middleware';
import { morganMiddleware } from './middleware/morgan.middleware';
import { createUser } from './repository/user.repository';
import { generatePassword, signToken } from './services/auth.service';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganMiddleware)

app.get('/', (_req: Request, res: Response) => res.json({ message: 'Hello World!' }));

app.post('/sign-up', validateData(signUpSchema), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        await createUser({ password: generatePassword(password), ...req.body });
        const payload = {
            email: email,
            iat: Math.floor(Date.now() / 1000),
        };
        const token = signToken(payload);
        res.status(201).json({ token });
    } catch (error) {
        next(error);
    }
});

app.use(errorHandler)


app.listen(PORT, () => logger.info(`Server is running on http://localhost:${PORT}`));


