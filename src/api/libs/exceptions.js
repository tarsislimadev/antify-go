class ValidationError extends Error {
  constructor(message = '') {
    const messages = ['VALIDATION']
    if (message) messages.push(message)
    super(messages.join(' - '))
  }
}

class NotImplementedError extends Error {
  constructor(message = '') {
    const messages = ['NOT IMPLEMENTED']
    if (message) messages.push(message)
    super(messages.join(' - '))
  }
}

class DuplicatedFunctionError extends Error {
  constructor(message = '') {
    const messages = ['DUPLICATED FUNCTION']
    if (message) messages.push(message)
    super(messages.join(' - '))
  }
}

class UndefinedFunctionError extends Error {
  constructor(message = '') {
    const messages = ['UNDEFINED FUNCTION']
    if (message) messages.push(message)
    super(messages.join(' - '))
  }
}

class NotAFunctionError extends Error {
  constructor(message = '') {
    const messages = ['NOT A FUNCTION']
    if (message) messages.push(message)
    super(messages.join(' - '))
  }
}

module.exports = {
  ValidationError,
  NotImplementedError,
  DuplicatedFunctionError,
  NotAFunctionError,
  UndefinedFunctionError,
}
