import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const targetSegment = '/src/'
const envPath = path.resolve(process.cwd())
let newPath = envPath
const index: number = envPath.indexOf(targetSegment)
if (index !== -1) newPath = path.resolve(envPath.substring(0, index))
dotenv.config({ path: path.resolve(newPath, '.env') })

export const getEnv = (key: string): string | number => {
    const envValue = process.env[key]
    if (typeof envValue === 'undefined') {
        throw new Error(`Environment variable ${key} is not set.`)
    }
    return envValue
}

export const PORT = getEnv('PORT') as number;
export const NODE_ENV = getEnv('NODE_ENV') as string;

export const DB_HOST = getEnv('DB_HOST') as string;
export const DB_PORT = getEnv('DB_PORT') as number;
export const DB_USER = getEnv('DB_USER') as string;
export const DB_PASSWORD = getEnv('DB_PASSWORD') as string;
export const DB_NAME = getEnv('DB_NAME') as string;

export const JWT_SECRET = getEnv('JWT_SECRET') as string;
export const JWT_EXPIRATION = getEnv('JWT_EXPIRATION') as number;
