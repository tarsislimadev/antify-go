
const str = require('../libs/strings')
const { NotImplementedError } = require('../libs/exceptions')
const netPkg = require('net')

const wsServer = (app) =>
  netPkg.createServer((listener) => {
    listener.on('data', (data) => {
      throw new NotImplementedError('tratar requisicoes e respostas do WebSocket')
      // listener.end()
    })
  })

module.exports = wsServer
