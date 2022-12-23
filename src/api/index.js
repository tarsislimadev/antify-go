const netPkg = require('net')
const { PORT } = require('./config')

const app = require('./app')
const Request = require('./request')
const Response = require('./response')

const server = netPkg.createServer((listener) => {
  listener.on('data', (chunk) => {
    const response = new Response({})

    try {
      response.fill(app.run(new Request({ chunk }), new Response({})))
    } catch (e) {
      response.setError(e)
    }

    listener.end(response.toString())
  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
