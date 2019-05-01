import md5 from 'md5';
import * as di from '@/DAL';
import {URI, encodeBase64} from './index';

export function checkEditable() {
  const foo = (~~(Math.random() * 10000000)).toString(16);
  return encodeBase64(foo)
  .then(salt => {
    return di.getUserInfo(salt)
    .then(userInfo => {
      if (userInfo.token) {
        const {token, app} = userInfo;
        const redirect = window.location.href;
        const signal = md5(app + token + salt + redirect);
        const params = URI.encode({app, token, salt, redirect, signal});
        window.location.href = `https://passport.cn-bar.com/?${params}`;
      }
      return userInfo;
    })
  });
}
