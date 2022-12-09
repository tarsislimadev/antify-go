
const {
  NotImplementedError,
  DuplicatedFunctionError,
  NotAFunctionError,
  UndefinedFunctionError
} = require('./exceptions')

const funcs = {}
// const aliases = {}

const route = function (route, func) {
  if (funcs[route] != undefined) {
    throw new DuplicatedFunctionError(route)
  }

  if (typeof func != 'function') {
    throw new NotAFunctionError(func)
  }

  funcs[route] = func
}

const alias = function (from, to) {
  throw new NotImplementedError('criar implementador de alias para as funcoes ambiguas ')
}

const run = function (route, vars = {}) {
  if (!funcs[route]) {
    throw new UndefinedFunctionError(route || '[none]')
  }

  return funcs[route]({ ...vars })
}

module.exports = {
  route,
  alias,
  run,
}
