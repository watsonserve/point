/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import SpaceInfo from '@/pages/space-info';
import ArticlePage from '@/pages/article-page';
import Editor from '@/pages/editor';
import {URI} from '@/helper';
import {loadUser} from '@/helper/permission';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/space/:spaceId',
    name: 'space',
    component: SpaceInfo,
    props: true,
  }, {
    path: '/article/:articleId',
    name: 'article',
    component: ArticlePage,
    props: true
  }, {
    path: '/editor/:articleId?',
    name: 'new-article',
    component: Editor,
    props: true,
    beforeEnter: (to, from, next) => {
      loadUser()
      .then(_ => next())
      .catch(_ => {
        const passport = {
          app: 'wiki',
          token: '',
          sign: '',
          redirect: window.location.href
        };

        window.location.href = `https://passport.cn-bar.com/?${URI.encode(passport)}`;
      });
    }
  }]
});
