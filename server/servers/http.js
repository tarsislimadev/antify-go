
const str = require('../libs/strings')
const httpPkg = require('net')
const { errors } = require('../libs')
const { log: { logInfo } } = require('../libs')

const okResponse = (response) => `HTTP/1.0 200 OK
Cache-Control: no-cache
Connection: close
Content-Type: text/html

${response}
`

const errorResponse = (response) => `HTTP/1.0 400 Bad request
Cache-Control: no-cache
Connection: close
Content-Type: text/html

${response}
`

const netServer = (app) =>
  httpPkg.createServer((listener) =>
    listener.on('data', (data) => {
      let response

      try {
        const { func, vars, pathname, search } = str.parseURL(data.toString())
        logInfo({ pathname, search })
        response = okResponse(app.run(func, vars))
      } catch (e) {
        response = errorResponse(errors.stringifyError(e))
      }

      listener.end(response)
    })
  )

module.exports = netServer
