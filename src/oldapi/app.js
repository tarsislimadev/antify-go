const { router, sh, system } = require('./libs')

// system

router.route('system.login', ({ user, password }) => system.login({ user, password }))

// user

router.route('user.create', ({ name, password, host }) => sh.user.create({ name, password, host }))

router.route('user.delete', ({ id }) => sh.user.delete({ id }))

router.route('user.describe', ({ id }) => sh.user.describe({ id }))

// data

router.route('data.list', ({ id, where, groupby, order }) => sh.data.list({ id, where, groupby, order }))

router.route('data.create', ({ data }) => sh.data.create({ data }))

router.route('data.describe', ({ id }) => sh.data.describe({ id }))

router.route('data.update', ({ id, data }) => sh.data.update({ id, data }))

router.route('data.delete', ({ id }) => sh.data.delete({ id }))

module.exports = router
