const netPkg = require('net')
const { port: PORT } = require('./config')

const app = require('./app')
const Request = require('./request')
const Response = require('./response')

const server = netPkg.createServer((listener) => {
  listener.on('data', (chunk) => {
    listener.end(
      app.run(
        new Request({ chunk }),
        new Response({})
      )
    )
  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
