const db = require('./libs/db')
const logger = require('./libs/logger')

const login = ({
  username = null,
  password = null,
}) => {
  logger.info('actions/login', { username, password })

  const { id: token } = db.in('logins').new().writeMany({ username, password })
  return { token }
}

const createuser = ({
  token = null,
  username = null,
  password = null,
}) => {
  logger.info('actions/createuser', { token, username, password })

  const login = db.in('logins').find(token)

  if (!login) {
    throw new Error('Login not found.', { token, username, password })
  }

  const { id } = db.in('users').new().writeMany({
    username,
    password,
    login_id: login.id,
  })

  return { id }
}

const describeuser = ({
  token = null,
  username = null,
}) => {
  logger.info('actions/describeuser', { token, username })
}

const grantuser = ({
  token = null,
  perm = null,
  username = null,
}) => {
  logger.info('actions/grantuser', { token, perm, username })
}

const revokeuser = ({
  token = null,
  perm = null,
  username = null,
}) => {
  logger.info('actions/revokeuser', { token, perm, username })
}

const deleteuser = ({
  token = null,
  username = null,
}) => {
  logger.info('actions/deleteuser', { token, username })
}

const deleteallusers = ({
  token = null,
}) => {
  logger.info('actions/deleteallusers', { token })
}

const listallusers = ({
  token = null,
}) => {
  logger.info('actions/listallusers', { token })
}

const createdir = ({
  token = null,
  dirname = null,
  recursive = null,
  public = null,
}) => {
  logger.info('actions/createdir', { token, dirname, recursive, public })
}

const listdir = ({
  token = null,
  dirname = null,
}) => {
  logger.info('actions/listdir', { token, dirname })
}

const publicdir = ({
  token = null,
  dirname = null,
  readonly = null,
}) => {
  logger.info('actions/publicdir', { token, dirname, readonly })
}

const privatedir = ({
  token = null,
  dirname = null,
}) => {
  logger.info('actions/privatedir', { token, dirname })
}

const deletedir = ({
  token = null,
  dirname = null,
  force = null,
}) => {
  logger.info('actions/deletedir', { token, dirname, force })
}

const createfile = ({
  token = null,
  filename = null,
  recursive = null,
}) => {
  logger.info('actions/createfile', { token, filename, recursive })
}

const listfile = ({
  token = null,
  filename = null,
  hidden = null,
}) => {
  logger.info('actions/listfile', { token, filename, hidden })
}

const readfile = ({
  token = null,
  filename = null,
}) => {
  logger.info('actions/readfile', { token, filename })
}

const writetext = ({
  token = null,
  filename = null,
  content = null,
}) => {
  logger.info('actions/writetext', { token, filename, content })
}

const writefile = ({
  token = null,
  filename = null,
}) => {
  logger.info('actions/writefile', { token, filename })
}

const deletefile = ({
  token = null,
  filename = null,
  force = null,
}) => {
  logger.info('actions/deletefile', { token, filename, force })
}

module.exports = {
  login,
  createuser,
  describeuser,
  grantuser,
  revokeuser,
  deleteuser,
  deleteallusers,
  listallusers,
  createdir,
  listdir,
  publicdir,
  privatedir,
  deletedir,
  createfile,
  listfile,
  readfile,
  writetext,
  writefile,
  deletefile,
}
