const path = require('path')

const fs = require('../fs')
const logger = require('../logger')

const DatabaseObject = require('./database-object')

class Database {
  dirname = ''

  constructor(dirname = '') {
    logger.info('libs/db/database/Database')

    this.dirname = dirname

    return fs.mkdirSync(this.dirname)
  }

  find(dirname = '') {
    logger.info('libs/db/database/Database.find')

    return fs.readdirSync(path.resolve(this.dirname, dirname))
  }

  new() {
    logger.info('libs/db/database/Database.new')

    return new DatabaseObject(this.dirname)
  }

  in(dirname = '') {
    logger.info('libs/db/database/Database.in')

    return new Database(path.resolve(this.dirname, dirname))
  }
}

module.exports = Database
