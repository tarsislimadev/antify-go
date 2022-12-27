const netPkg = require('net')
const { PORT } = require('./config')

const app = require('./app')
const Request = require('./request')
const Response = require('./response')

const server = netPkg.createServer((listener) => {
  const end = (data = '') => listener.end(data.toString())

  listener.on('data', (chunk) => {
    const response = new Response({})

    try {
      end((app.run(new Request({ chunk }), response)))
    } catch (e) {
      end(response.setError(e))
    }
  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
