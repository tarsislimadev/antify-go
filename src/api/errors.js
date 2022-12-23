class ApplicationError extends Error {
  status = 500

  constructor(message = 'Application Error') {
    super(message)
  }

  getStatus() {
    return this.status
  }

  getMessage() {
    return this.message
  }
}

module.exports = {
  ApplicationError
}
