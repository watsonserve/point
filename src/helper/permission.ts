import md5 from 'md5';
import * as di from '@/DAL';
import {URI, encodeBase64} from './index';

const AUTH_ADDR = 'https://wiki.watsonserve.com/api/auth.html';

export function checkEditable() {
  const foo = (~~(Math.random() * 10000000)).toString(16);
  let salt = '';
  return encodeBase64(foo)
  .then(_salt => {
    salt = _salt;
    return di.getUserInfo(salt);
  })
  .then(userInfo => {
    if (!userInfo.token) {
      return userInfo;
    }
    const {token, app} = userInfo;
    const redirect = `${AUTH_ADDR}?rd=${encodeURIComponent(window.location.pathname)}`;
    const signal = md5(app + token + salt + redirect);
    const params = URI.encode({app, token, salt, redirect, signal});
    window.location.href = `https://passport.watsonserve.com/?${params}`;
  });
}
