const path = require('path')

const { info } = require('../logger')

const { mkdirSync, writeFileSync } = require('../fs')

const { v4: uuid } = require('../uuid')

class DatabaseObject {
  index = ''
  id = null
  dirname = null

  constructor(index, id = null) {
    info('lib/db/DatabaseObject', { index, id })

    this.index = index

    this.id = id === null ? uuid() : id

    this.dirname = path.resolve(index, id)

    mkdirSync(this.dirname)
  }

  write(name, value = null) {
    info('lib/db/DatabaseObject.write', { name, value })

    const filename = path.resolve(this.dirname, name)

    writeFileSync(filename, value)

    return this
  }

  writeMany(props = {}) {
    info('lib/db/DatabaseObject.writeMany', { props })

    const self = this

    Object.keys(props)
      .filter(prop => !!prop && !!props[prop])
      .map((prop) => self.write(prop.toString(), props[prop].toString()))

    return this
  }
}

module.exports = DatabaseObject

