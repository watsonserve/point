import * as di from '@/DAL';

export function loadUser() {
  return di.getUserInfo();
}
