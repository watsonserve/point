import { reject } from "async";

export function reduce(params, callback) {
  return Object.keys(params).reduce((pre, key, idx) => {
    const val = params[key];
    return callback(pre, key, val, idx);
  }, {});
}

export class URI {
  static encode(that) {
    return Object.keys(that).reduce((pre, key) => {
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

export function encodeBase64(raw) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = function(ev) {
      const ret = reader.result.split(';base64,')[1];
      ret ? resolve(ret) : reject();
    }
    reader.readAsDataURL(new File([raw], ''));
  });
}