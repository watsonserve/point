import _ from 'lodash'

export function toProto<T>(dst: T, params: any): T {
  _.forEach(params, (val: any, key: string) => {
    key = `set_${key}`.replace(/_[a-z]/g, foo => foo[1].toLocaleUpperCase())
    const func = _.get(dst, key)
    func && func.call(dst, val)
  })
  return dst
}

export function buf2str(buf: Uint8Array): string {
  return [].map.call(buf, (ch: number) => String.fromCharCode(ch)).join('')
}