class Request {
  constructor({ chunk }) {
    this.method = this.parseMethod({ chunk })
    this.path = this.parsePath({ chunk })
    this.query = this.parseQuery({ chunk })
    this.headers = this.parseHeaders({ chunk })
  }

  splitLines({ chunk = '' }) {
    return chunk.toString().split(/\r\n/ig)
  }

  parseFirstLine({ chunk = '' }) {
    const [first = ''] = this.splitLines({ chunk })
    return first.split(' ')
  }

  parseMethod({ chunk = '' }) {
    const [method] = this.parseFirstLine({ chunk })
    return method
  }

  parseFullPath({ chunk = '' }) {
    const [, fullpath,] = this.parseFirstLine({ chunk })
    return fullpath
  }

  parsePath({ chunk = '' }) {
    const fullpath = this.parseFullPath({ chunk })
    const [path] = fullpath.split('?')
    return path
  }

  parseQuery({ chunk = '' }) {
    const fullpath = this.parseFullPath({ chunk })
    const [, query = ''] = fullpath.split('?')
    return query.split('&').map((pair) => pair.split('='))
  }

  parseHeaders({ chunk = '' }) {
    const [, ...lines] = this.splitLines({ chunk })
    return lines.map((line) => line.split(': ', 2))
  }
}

module.exports = Request
