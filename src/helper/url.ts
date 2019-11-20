
type Value = string | boolean | (string | boolean)[]

function turnBoolean(val: string): boolean | string {
  switch (val) {
    case '':
    case 'true':
      return true
    case 'false':
      return false
  }
  return decodeURIComponent(val)
}

export interface URLObj {
  hash: string
  host: string
  hostname: string
  href: string
  origin: string
  password: string
  pathname: string
  port: number
  protocol: string
  query: {[key: string]: Value}
  search: string
  username: string
}

export function parseURL(url: string): URLObj {
  let urlObj
  try {
    urlObj = new URL(url)
  } catch(err) {
    return
  }
  const {
    hash,
    host,
    hostname,
    href,
    origin,
    password,
    pathname,
    port,
    protocol,
    search,
    username,
    searchParams,
  } = urlObj
  const query: {[key: string]: Value } = {}

  searchParams.forEach((rawVal: string, key: string) => {
    let value: Value = query[key]
    const val = turnBoolean(rawVal)
    // value maybe boolean false
    if (undefined !== value) {
      if (!Array.isArray(value)) {
        value = [value]
      }
      value.push(val)
    } else {
      value = val
    }
    query[key] = value
  })

  return {
    hash: hash.substr(1),
    host,
    hostname,
    href,
    origin: 'null' === origin ? '' : origin,
    password,
    pathname,
    port: +port,
    protocol: protocol.substr(0, protocol.length - 1),
    query,
    search: search.substr(1),
    username,
  }
}
