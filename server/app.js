
const { router, sh, system } = require('./libs')

router.route('login', ({ user, password }) => system.login(user, password))

router.route('createuser', ({ name, password, host }) => sh.createuser({ name, password, host }))

router.route('describeuser', ({ name, host }) => sh.describeuser({ name, host }))

module.exports = router
