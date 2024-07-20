import knex from "../db/knex";
import { SignUpType } from "../types/user.type";

export const createUser = (user: SignUpType) => knex('users').insert(user);

export const findUserByEmail = (email: string) => knex('users')
    .where({ email })
    .first();