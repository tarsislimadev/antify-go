
const str = require('../libs/strings')
const netPkg = require('net')

const netServer = (app) =>
  netPkg.createServer((listener) => {
    listener.on('data', (data) => {
      throw new Error('NOT IMPLEMENTED.')
    })
  })

module.exports = netServer
