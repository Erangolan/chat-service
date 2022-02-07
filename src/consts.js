require('dotenv').config()

const packagejson = require('../package.json')

const {
  PORT,
  MESSAGE,
  MESSAGES,
} = process.env

module.exports = {
  PORT,
  MESSAGE,
  MESSAGES,
  SERVICE_NAME: `${packagejson.name}:${packagejson.version}`,
}
