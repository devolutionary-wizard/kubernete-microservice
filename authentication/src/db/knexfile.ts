import { Knex } from 'knex'
import path from 'path'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../core/config'

export const connectionOptions = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
}
const knexConfig: Knex.Config = {
    client: 'mysql2',
    connection: {
        ...connectionOptions,
    },
    migrations: {
        tableName: '_migrations',
        directory: path.join(__dirname, 'migrations'),
        disableMigrationsListValidation: true,
    },
    seeds: {
        directory: path.join(__dirname, 'seeds'),
    },
}

export default knexConfig