const path = require('path')

const { mkdirSync, readdirSync } = require('../fs')

const DatabaseObject = require('./database-object')

class Database {
  dirname = ''

  constructor(dirname = '') {
    this.dirname = dirname

    mkdirSync(this.dirname)
  }

  find(dirname = '') {
    readdirSync(path.resolve(this.dirname, dirname))
  }

  new() {
    return new DatabaseObject(this.dirname)
  }

  in(dirname = '') {
    return new Database(path.resolve(this.dirname, dirname))
  }
}

module.exports = Database
