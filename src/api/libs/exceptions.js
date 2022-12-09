
class ValidationError extends Error {
  constructor(message = '') {
    super('VALIDATION ' + message)
  }
}

class NotImplementedError extends Error {
  constructor(message = '') {
    super('NOT IMPLEMENTED - ' + message)
  }
}

class DuplicatedFunctionError extends Error {
  constructor(func = '') {
    super('DUPLICATED FUNCTION - ' + func)
  }
}

class UndefinedFunctionError extends Error {
  constructor(func = '') {
    super('UNDEFINED FUNCTION - ' + func)
  }
}

class NotAFunctionError extends Error {
  constructor(func = '') {
    super('NOT A FUNCTION - ' + func)
  }
}

module.exports = {
  ValidationError,
  NotImplementedError,
  DuplicatedFunctionError,
  NotAFunctionError,
  UndefinedFunctionError,
}
