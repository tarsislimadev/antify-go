const fs = require('fs')
const path = require('path')

const { ValidationError } = require('./exceptions')
const strings = require('./strings')
const {
  root_password,
  data_path,
} = require('../config')

const getDataFile = (...paths) =>
  fs.readFileSync(path.resolve(data_path, ...paths))

const getDataDir = (...paths) =>
  fs.readdirSync(path.resolve(data_path, ...paths))

//

const listUserAccesses = (user) =>
  getDataDir('system', 'users', user)

const canUserAccess = (user) =>
  listUserAccesses(user).length > 0

const getUserPasswords = (user) =>
  listUserAccesses(user)
    .map((access) => getDataFile('system', 'users', user, access, 'password'))

const isUserPassword = (user, password) =>
  getUserPasswords(user)
    .reduce((is, pass) => is || pass === password, false)

const login = (user, password, host = 'localhost') => {
  if (!user)
    throw new ValidationError(`INVALID USER: ${user}`)

  if (!password)
    throw new ValidationError(`INVALID PASSWORD: ${password}`)

  if (user == 'root' && password == root_password) {
    return strings.makeHash([user, password].join(''))
  }

  if (canUserAccess(user) && isUserPassword(user, password)) {
    return strings.makeHash([user, password].join(''))
  }

  throw new ValidationError('USER NOT FOUND')
}

module.exports = {
  login,
}
