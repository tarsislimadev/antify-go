class Response {
  payload = {
    status: 200,
    body: {}
  }

  constructor({ status = 200 }) {
    this.status = status
  }

  status(status) {
    this.status = status
  }

  json(json) {
    this.body = JSON.parse(json)
  }

  toJSON() {
    return {}
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}

module.exports = Response
