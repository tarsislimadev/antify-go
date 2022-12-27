const db = require('../libs/db')

const login = ({ user, password }) => ({
  token: db.in('internals/login').new().writeMany({ user, password }).id
})

const createuser = ({ query: { token = null, user = null, password = null, host = null } }) => ({})

const describeuser = ({ query: { token = null, user = null, host = null } }) => ({})

const grantuser = ({ query: { token = null, perm = null, user = null, host = null } }) => ({})

const revokeuser = ({ query: { token = null, perm = null, user = null, host = null } }) => ({})

const deleteuser = ({ query: { token = null, user = null, host = null } }) => ({})

const deleteallusers = ({ query: { token = null } }) => ({})

const listallusers = ({ query: { token = null } }) => ({})

const createdir = ({ query: { token = null, dirname = null, recursive = null, public = null } }) => ({})

const listdir = ({ query: { token = null, dirname = null } }) => ({})

const publicdir = ({ query: { token = null, dirname = null, readonly = null } }) => ({})

const privatedir = ({ query: { token = null, dirname = null } }) => ({})

const deletedir = ({ query: { token = null, dirname = null, force = null } }) => ({})

const createfile = ({ query: { token = null, filename = null, recursive = null } }) => ({})

const listfile = ({ query: { token = null, filename = null, hidden = null } }) => ({})

const readfile = ({ query: { token = null, filename = null } }) => ({})

const writetext = ({ query: { token = null, filename = null, content = null } }) => ({})

const writefile = ({ query: { token = null, filename = null } }) => ({})

const deletefile = ({ query: { token = null, filename = null, force = null } }) => ({})

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
