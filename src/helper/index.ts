import { reject } from "async";

export function reduce(params: any, callback: any) {
  return Object.keys(params).reduce((pre, key, idx) => {
    const val = params[key];
    return callback(pre, key, val, idx);
  }, {});
}

export class URI {
  static encode(that: any) {
    return Object.keys(that).reduce((pre: string[], key: string) => {
      let val = that[key];
      if (undefined !== val && '' !== val) {
        key = encodeURIComponent(key);
        val = encodeURIComponent(val);
        pre.push(`${key}=${val}`);
      }
      return pre;
    }, []).join('&');
  }
}

export function encodeBase64(raw: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function(ev) {
      let result = '';
      if (reader.result) {
        if ('string' === typeof reader.result) {
          result = reader.result;
        } else {
          result = reader.result.toString();
        }
        const ret = result.split(';base64,')[1];
        if (ret) {
          resolve(ret);
          return;
        }
      }
      reject();
    }
    reader.readAsDataURL(new File([raw], ''));
  });
}