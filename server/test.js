
const { logInfo } = require('./libs/log')

const testsFile = require('./app.http.test')

const test = (testFn, cb) => {
  try {
    const promise = testFn(() => cb('OK'), (err = '') => cb(err.toString()))
    Promise.all([promise]).then(() => cb('OK'))
  } catch (e) {
    cb(e.message)
  }
}

const runTests = () =>
  Object.keys(testsFile)
    .map((scope) =>
      testsFile[scope].map(({ name, fn }) =>
        test(fn, (res) => logInfo([res, scope, name].join(' - ')))
      )
    )

runTests()
