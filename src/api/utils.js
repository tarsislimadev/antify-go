const { ENV } = require('./config')

const logger = (name, log = {}) => {
  if (process.env.ENV == 'development') {
    console.log(name, log)
  }
}

module.exports = { logger }
