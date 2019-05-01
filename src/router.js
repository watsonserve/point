/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import {checkEditable} from '@/helper/permission';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    component: _ => import('@/pages/home')
  }, {
    path: '/space/:spaceId',
    name: 'space',
    component: _ => import('@/pages/space-info'),
    props: true,
  }, {
    path: '/article/:articleId',
    name: 'article',
    component: _ => import('@/pages/article-page'),
    props: true
  }, {
    path: '/editor/:articleId?',
    name: 'new-article',
    component: _ => import('@/pages/editor'),
    props: true,
    beforeEnter: (to, from, next) => {
      checkEditable()
      .then(_ => next());
    }
  }]
});
