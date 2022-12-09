
const FOR_HASH = 'antify-2022'

const parseURL = (url = '/') => {
  const { pathname, search } = new URL('http://api' + url.toString()
    .split(/\r?\n/)
    .reduce((old, cur) => cur.indexOf('GET') != -1 ? cur : old, '')
    .split(' ')[1] // FIXME
  )

  const func = pathname.split('').filter((str) => str != '/').join('')

  const vars = search
    .split(/\?|\&/ig).map((pair) => pair.split('='))
    .filter(pair => pair[0].length > 0)
    .reduce((obj, pair) => {
      obj[pair[0]] = pair[1]
      return obj
    }, {})

  return { func, vars, pathname, search }
}

const stringHas = (str, has) => 
  str.toString().indexOf(has) != -1

const makeHash = (str) => {
  return [str, FOR_HASH,].join('@') // FIXME
}

module.exports = {
  parseURL,
  makeHash,
  stringHas,
}
