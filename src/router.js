/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
// import SpaceInfo from ;
// import SearchResult from '@/pages/SearchResult';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/space/:spaceId',
    name: 'space',
    component: _ => require('@/pages/space-info'),
    props: true
  // }, {
  //     path: '/search_result/',
  //     name: 'search_result',
  //     component: SearchResult,
  //     props: true
  }]
});
