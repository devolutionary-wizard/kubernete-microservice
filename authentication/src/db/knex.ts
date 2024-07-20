import knex, { Knex } from 'knex'
import knexConfig from './knexfile'
const knexInstance: Knex = knex(knexConfig)
export default knexInstance