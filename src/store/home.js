/* eslint-disable */

import * as di from "@/DAL/home.js";
import {dateFormat} from '@/utils';

export default {
    namespaced: true,
    state: {
        spaces: {
            list: [],
            total: 50
        },
        curSpace: {
          spaceId: 'undefined-space-id',
          spaceName: '未知空间',
          bgColor: NaN,
          articles: []
        },
        curArticle: {}
    },
    actions: {
        getSpaces({commit}) {
            return di.getSpaces()
            .then(ret => {
                commit('spaces', ret);
            })
            .catch(err => {
                console.log(err);
            });
        },
        getSpaceById({commit}, spaceId) {
            return di.getSpaceById(spaceId)
            .then(ret => {
                commit('space', ret);
            });
        },
        getArticleById({commit}, articleId) {
            return di.getArticleById(articleId)
            .then(ret => {
                commit('space', ret.space);
                commit('article', ret.article);
            });
        }
    },
    mutations: {
        space(state, payload) {
            payload.bgColor = payload.spaceName.charCodeAt() % 7;
            state.curSpace = payload;
        },
        spaces(state, payload) {
            state.spaces = payload;
        },
        article(state, payload) {
            payload.updateTime = dateFormat(payload.updateTime);
            state.curArticle = payload;
        }
    }
};
