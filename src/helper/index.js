
export class URI {
  static encode(that) {
    return Object.keys(that).reduce((pre, key) => {
      const val = that[key];
      if (undefined !== val && '' !== val) {
        pre.push(`${key}=${encodeURIComponent(val)}`);
      }
      return pre;
    }, []).join('&');
  }
}
