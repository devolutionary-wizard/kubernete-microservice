import { randomBytes, pbkdf2Sync } from 'crypto'
import { sign, verify } from 'jsonwebtoken'
import { JWT_EXPIRATION, JWT_SECRET } from '../core/config'

/**
 * Generate a password hash
 * @param password - password to hash
 * @returns - hash
 */
export const generatePassword = (password: string): string => {
    const salt = randomBytes(32).toString('hex')
    const hash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return salt + ':' + hash
}

/**
 * Check if the password is valid
 * @param password - password to check
 * @param hashPassword - hash password
 * @returns - boolean
 */
export const validPassword = (password: string, hashPassword: string): boolean => {
    const [salt, hash] = hashPassword.split(':')
    const checkHash = pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === checkHash
}

/**
 * Sign a token
 * @param payload - payload to sign
 * @returns - token
 */
export const signToken = (payload: object): string => sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

/**
 * Verify a token
 * @param token - The token to verify
 * @returns - The decoded token if valid, or an error message
 */
export const verifyToken = (token: string): object | string => {
    try {
        const decoded = verify(token, JWT_SECRET);
        return decoded;
    } catch (error: any) {
        return `Token verification failed: ${error.message}`;
    }
};