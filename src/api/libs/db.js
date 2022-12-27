const { DATA_PATH } = require('../config')
const { SLASH } = require('../constants')

const { v4: uuid } = require('../libs/uuid')

const path = require('path')
const fs = require('fs')

class DatabaseObject {
  index = ''
  id = null

  constructor(index, id = '') {
    this.index = index

    this.id = id || uuid()
  }

  create(name = path.resolve(this.index, this.id)) {
    fs.mkdirSync(name, { recursive: true })

    return this
  }

  write(name, value = null) {
    const { index, id } = this

    this.create(path.resolve(index, id))

    fs.writeFileSync(path.resolve(index, id, name), value)

    return this
  }

  writeMany(props = {}) {
    const self = this

    Object.keys(props)
      .map((prop) => self.write(prop, props[prop]))

    return this
  }
}

class Database {
  dirname = ''

  constructor(dirname = '') {
    this.dirname = dirname
  }

  new() {
    return new DatabaseObject(this.dirname)
  }

  in(dirname = '') {
    return new Database(path.resolve(this.dirname, dirname))
  }
}

module.exports = new Database(DATA_PATH)
