
const {
  NotImplementedError,
} = require('./exceptions')

const createuser = () => {
  throw new NotImplementedError('implementar funcao "createuser".')
}

const describeuser = () => {
  throw new NotImplementedError('implementar funcao "describeuser".')
}

module.exports = {
  createuser,
  describeuser,
}
