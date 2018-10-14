/**
 * @file 数据接口层
 * @author wangxingzhuo<wangxingzhuo@baidu.com>
 */

import axios from 'axios';
import queryString from 'query-string';

function toUrlencode(params) {
    return queryString.stringify(params);
}

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
  timeout: 3000,
  headers: {
  'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default function accessInterface({url, method = 'get', params = {timestamp: Date.now()}, errmsg = '接口异常', headers = {}}) {
    return instance[method](url, toUrlencode(params), {headers})
    .then(res => {
        const data = res.data;

        // 接口返回失败消息
        if (0 !== data.status) {
            return Promise.reject(data.message);
        }

        return data.data;
    })
    .catch(err => {
        return Promise.reject(err || errmsg);
    });
}
