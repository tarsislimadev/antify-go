const { routes } = require('./routes')
const { logger } = require('./utils')

const run = (req, res) => {
  logger('app/run', { req, res })

  // FIXME
  
  // return routes.filter(r => r.name == req.path)
  //   .reduce((p, res) => route.doer.func(req, res) || res, res)

  return res.toString()
}

module.exports = { run }
