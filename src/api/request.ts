/**
 * 一切request从这里开始
 */
const fetch = window.fetch

export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD'
}

enum ContentType {
  URLENCODE = 'application/x-www-form-urlencoded',
  FORMDATA = 'multipart/form-data',
  JSON = 'application/json',
  PROTOBUF = 'application/x-protobuf',
}

export interface RequestOptions {
  url: string
  method?: Method
  headers?: {
    [name: string]: string
  }
  data?: any
  timeout?: number
}

export default function(options: RequestOptions): Promise<any> {
  options = {
    method: Method.POST,
    timeout: 3000,
    headers: {},
    ...options
  } as RequestOptions
  const { url, method, timeout } = options
  let { headers, data } = options

  // 有数据则设置数据类型，没有则设置内容长度为0
  if (data) {
    const contentType = headers['Content-Type'] || ContentType.PROTOBUF

    switch (contentType) {
      case ContentType.JSON:
        data = JSON.stringify(data)
      case ContentType.URLENCODE:
        data = encodeURIComponent(data)
      default:
        break
    }

    headers = {
      ...headers,
      'Content-Type': `${contentType}; charset=utf-8`
    }
  } else {
    headers['Content-Length'] = '0'
  }

  return new Promise((resolve, reject) => {
    // 强制超时reject
    const timeHandle = timeout ? setTimeout(() => reject(new Error('timeout')), timeout) : null
    fetch(url, {
      method,
      headers,
      cache: 'no-cache',
      credentials: 'include',
      body: data
    })
    .then(resp => {
      clearTimeout(timeHandle)
      if (!resp.ok) {
        return Promise.reject(new Error(resp.statusText || String(resp.status)))
      }
      const respHeaders = resp.headers
      const contentType = respHeaders.get('Content-Type').split(';')[0]
      switch (contentType) {
        case 'application/json':
          return resp.json()
        default:
          if (contentType.startsWith('text/')) {
            return resp.text()
          }
          return resp.blob()
      }
    })
    .then(resolve)
    .catch(reject)
  })
}
