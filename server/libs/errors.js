
const defaultError = 'DEFAULT ERROR'

const stringifyErrorString = str => 'ERROR - ' + str

const stringifyErrorObject = err => [
  err.code || defaultError,
  err.message
].join(' - ')

const stringifyError = (e) => {
  switch (true) {
    case typeof e === 'string':
      return stringifyErrorString(e)
    case typeof e === 'object':
      return stringifyErrorObject(e)
    case Array.isArray(e):
      return e.map(err => stringifyError(err)).join('\n')
  }

  return stringifyErrorString(defaultError)
}

module.exports = {
  stringifyError,
}
