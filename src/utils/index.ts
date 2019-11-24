
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