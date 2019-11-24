import { URI } from '@/helper/url'
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

function genGETParams(url: string, data?: any): string {
  return `${url}?${URI.encode(data)}`
}

function genBodyParams(headers: any, data?: any): string {
  // 有数据则设置数据类型，没有则设置内容长度为0
  if (!data) {
    headers['Content-Length'] = '0'
    return ''
  }

  const contentType = headers['Content-Type'] || ContentType.JSON
  headers['Content-Type'] = `${contentType}; charset=utf-8`

  switch (contentType) {
    case ContentType.JSON:
      return JSON.stringify(data)
    case ContentType.URLENCODE:
      return URI.encode(data)
    default:
      break
  }

  return data
}

export default function(options: RequestOptions): Promise<any> {
  options = {
    method: Method.POST,
    timeout: 3000,
    headers: {},
    ...options
  } as RequestOptions
  const { method, timeout } = options
  let { url, headers, data } = options

  switch (method) {
    case Method.GET:
      url = genGETParams(url, data)
      break
    case Method.PUT:
    case Method.POST:
      data = genBodyParams(headers, data)
    default:
      break
  }

  return new Promise((resolve, reject) => {
    // 强制超时reject
    const timeHandle = timeout ? setTimeout(() => reject(new Error('timeout')), timeout) : null
    const rep: any = {
      method,
      headers,
      cache: 'no-cache',
      credentials: 'include'
    }
    if (Method.GET !== method && data) {
      rep.body = data;
    }
    fetch(url, rep)
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
