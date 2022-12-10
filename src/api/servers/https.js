const { NotImplementedError } = require('../libs/exceptions')

module.exports = () => {
  throw new NotImplementedError()
}
