import axios from 'axios';
import queryString from 'query-string';

function toUrlencode(params) {
  return queryString.stringify(params);
}

axios.defaults.timeout = 5000;

export default function accessInterface({url, method = 'get', params = {}, errmsg = '接口异常', headers = {}}) {
  let reqArgs = {_: Date.now()};
  if ('get' === method) {
    reqArgs = {...params, ...reqArgs};
  }
  return axios({
    url,
    method,
    params: reqArgs,
    headers,
    data: 'get' === method ? null : params
  })
  .then(res => {
    const contentType = res.headers['Content-Type'] || '';
    const body = res.data;
    if ('text/plain' === contentType.split(';')[0]) {
      return body;
    }

    // 接口返回失败消息
    if (!body.status) {
      return Promise.reject(body.message);
    }

    return body.data;
  })
  .catch(err => {
    return Promise.reject(err || errmsg);
  });
}
