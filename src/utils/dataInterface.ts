import axios, { AxiosRequestConfig } from 'axios';
import {StdPacket} from '@/DAL/packet_pb';
import {reduce} from '@/helper';

axios.defaults.timeout = 5000;

export default function accessInterface(options: AxiosRequestConfig) {
  let {url, method = 'get', params = {}, errmsg = '接口异常', headers = {}} = options;
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
    const headers = reduce(res.headers, (pre, key, val) => {
      key = key.toLowerCase();
      pre[key] = val;
      return pre;
    });

    let body = res.data;

    let contentType = headers['content-type'] || '';
    contentType = contentType.split(';')[0];
    switch (contentType) {
      case 'application/x-protobuf':
        body = StdPacket.deserializeBinary(body);
      case 'application/json':
        // 接口返回失败消息
        if (!body.status) {
          return Promise.reject(body.msg);
        }
        return body.data;
      case 'text/plain':
      default:
        return body;
    }
  })
  .catch(err => {
    return Promise.reject(err || errmsg);
  });
}
