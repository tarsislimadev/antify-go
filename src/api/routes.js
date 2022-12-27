const router = require('./router')
const actions = require('./actions')

router.use('login').do((_, res) =>
  res.setJSON(actions.login({ user: 'user', password: 'password', })) // FIXME
)

router.use('createuser').do(({ body, header }, res) =>
  res.setJSON(actions.createuser({ token: header.token, ...body }))
)

module.exports = router
