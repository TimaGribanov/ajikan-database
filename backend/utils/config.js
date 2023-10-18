require('dotenv').config()

const PORT = process.env.PORT

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PWD = process.env.DB_PWD
const DB_SCHEMA = process.env.DB_SCHEMA

module.exports = {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PWD,
  DB_SCHEMA
}