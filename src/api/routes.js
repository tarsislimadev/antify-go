const router = require('./router')
const actions = require('./actions')
const { logger } = require('./utils')

router.use('login').do((req, res) => {
  logger('router.login', { req, res })

  return res.setJSON(actions.login(req.body))
})

router.use('createuser').do(({ body, header }, res) => {
  logger('router.createuser', { req: { body, header }, res })

  return res.setJSON(actions.createuser({ token: header.token, ...body }))
})

module.exports = router
