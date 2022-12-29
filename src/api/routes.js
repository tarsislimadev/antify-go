const router = require('./libs/router')

const { info } = require('./libs/logger')

const actions = require('./actions')

router.use('login').do(({ query }, res) => {
  info('routes/login', { query, res })

  return res.setJSON(actions.login({
    username: query.username?.[0],
    password: query.password?.[0],
  }))
})

router.use('createuser').do(({ query, header }, res) => {
  info('routes/createuser', { query, header, res })

  return res.setJSON(actions.createuser({
    token: header.token,
    username: query.username?.[0],
    password: query.password?.[0],
    host: query.password?.[0],
  }))
})

module.exports = router
