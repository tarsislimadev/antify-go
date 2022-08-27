
const http = require('http')
const { NotImplementedError } = require('./libs/exceptions')
const { stringHas } = require('./libs/strings')

const req = (path, data = {}) =>
  new Promise((resolve, reject) => {
    const strData = JSON.stringify(data)

    const options = {
      hostname: '0.0.0.0',
      path: '/' + path,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': strData.length
      }
    }

    const req = http.request(options, res => {
      let response = ''
      res.on('data', d => response += d.toString())
      res.on('end', () => resolve(response))
    })

    req.on('error', error => reject(error))
    req.write(strData)
    req.end()
  })

module.exports.login = ([
  {
    name: 'login without user or password',
    fn: (_, errorFn) => req('login')
      .then((res) => stringHas(res, 'INVALID USER'))
      .catch((error) => errorFn(error))
  },
  {
    name: 'login with only a non-exists user',
    fn: (_, errorFn) => req('login?user=nonuser')
      .then((res) => stringHas(res, 'INVALID USER'))
      .catch((error) => errorFn(error))
  },
  {
    name: 'login with "root" user and "root" password ',
    fn: (_, errorFn) => req('login?user=root&password=root')
      .then((res) => res.toString() != '')
      .catch((error) => errorFn(error))
  },
  {
    name: 'login with "root" user and "notroot" password ',
    fn: (_, errorFn) => req('login?user=root&password=notroot')
      .then((res) => stringHas(res, 'INVALID USER'))
      .catch((error) => errorFn(error))
  },
  {
    name: 'login with "user" user and "user" password ',
    fn: (_, errorFn) => req('login?user=user&password=user')
      .then((res) => stringHas(res, 'INVALID USER'))
      .catch((error) => errorFn(error))
  },
])

module.exports.createuser = ([
  () => { throw new NotImplementedError('implementar teste de criacao de usuario') }
])
