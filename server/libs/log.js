
const logInfo= (...info) =>
  console.log(...info)

const logError = (...error) => 
  console.error(...error)

module.exports = {
  logInfo,
  logError,
}
