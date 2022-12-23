const { NEWLINE } = require('./constants')
const { ApplicationError } = require('./errors')
const { logger } = require('./utils')

class Response {
  payload = {
    status: 200,
    headers: [],
    body: {
      status: 'ok',
      message: null,
      data: {}
    }
  }

  fill(res = new Response()) {
    logger('fill', { res })

    this.payload.status = res.payload?.status
    this.payload.headers = res.payload?.headers
    this.payload.body.status = res.payload?.body.status
    this.payload.body.message = res.payload?.body.message
    this.payload.body.data = res.payload?.body.data

    return this
  }

  setStatus(status) {
    logger('setStatus', { status })
    this.payload.status = status

    return this
  }

  setJSON(json = {}) {
    logger('setJSON', { json })

    this.payload.body.data = JSON.parse(JSON.stringify(json))

    return this
  }

  setErrorStatus(e = new ApplicationError()) {
    logger('setErrorStatus', { e })

    this.payload.status = 500
    this.payload.body.status = 'error'

    return this
  }

  setErrorMessage(e = new ApplicationError()) {
    logger('setErrorMessage', { e })

    this.payload.body.message = 'error'

    if (e instanceof ApplicationError) {
      this.payload.body.message = e.getMessage()
    }

    return this
  }

  setErrorData(e = new ApplicationError()) {
    logger('setErrorData', { e })

    const { stack } = e

    this.payload.body.data = { stack }

    return this
  }

  setError(e = new ApplicationError()) {
    logger('setError', { e })

    this.setErrorStatus(e)
    this.setErrorMessage(e)
    this.setErrorData(e)

    return this
  }

  parseStatusMessage(status = 500) {
    logger('parseStatusMessage', { status })

    switch (status) {
      case 200: return 'OK'
      case 400: return 'CLIENT ERROR'
      case 404: return 'NOT FOUND'
      case 500: return 'SERVER ERROR'
    }

    return 'SERVER ERROR'
  }

  toJSON() {
    const { status, mesage, data } = this.payload.body

    return {
      status: status === 200 ? 'ok' : 'error',
      mesage,
      data
    }
  }

  getBodyString() {
    return JSON.stringify(this.toJSON(), null, 4)
  }

  parseContentLength(body = '') {
    logger('parseContentLength', { body })
    return +Buffer.from([...body]).lenght
  }

  getFirstLine() {
    const { status } = this.payload
    const statusMessage = this.parseStatusMessage(status)

    return (`HTTP/1.1 ${status} ${statusMessage}`)
  }

  getContentTypeLine() {
    return 'Content-Type: application/json'
  }

  toString() {
    const strArr = []
    strArr.push(this.getFirstLine())
    strArr.push(this.getContentTypeLine())
    strArr.push('')
    strArr.push(this.getBodyString())

    return strArr.join(NEWLINE)
  }
}

module.exports = Response
