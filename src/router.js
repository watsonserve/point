/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home';
import SpaceInfo from '@/pages/space-info';
import ArticlePage from '@/pages/article-page';
import Editor from '@/pages/editor';

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
    path: '/edit/:spaceId/:articleId?',
    name: 'new-article',
    component: Editor,
    props: true
  }]
});
