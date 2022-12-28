const db = require('./libs/db')

const login = ({ username, password }) => {
  const { id: token } = db.in('logins').new().writeMany({ username, password })
  return { token }
}

const createuser = ({ token = null, username = null, password = null }) => {
  const login = db.in('logins').find(token)

  if (!login) throw new Error('Login not found.', { token })

  const { id } = db.in('users').new().writeMany({
    username,
    password,
    login: login.id
  })

  return { id }
}

const describeuser = ({ token = null, username = null }) => ({})

const grantuser = ({ token = null, perm = null, username = null }) => ({})

const revokeuser = ({ token = null, perm = null, username = null }) => ({})

const deleteuser = ({ token = null, username = null }) => ({})

const deleteallusers = ({ token = null }) => ({})

const listallusers = ({ token = null }) => ({})

const createdir = ({ token = null, dirname = null, recursive = null, public = null }) => ({})

const listdir = ({ token = null, dirname = null }) => ({})

const publicdir = ({ token = null, dirname = null, readonly = null }) => ({})

const privatedir = ({ token = null, dirname = null }) => ({})

const deletedir = ({ token = null, dirname = null, force = null }) => ({})

const createfile = ({ token = null, filename = null, recursive = null }) => ({})

const listfile = ({ token = null, filename = null, hidden = null }) => ({})

const readfile = ({ token = null, filename = null }) => ({})

const writetext = ({ token = null, filename = null, content = null }) => ({})

const writefile = ({ token = null, filename = null }) => ({})

const deletefile = ({ token = null, filename = null, force = null }) => ({})

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
