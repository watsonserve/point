/* eslint-disable */

import * as di from "@/DAL/home.js";

export default {
    namespaced: true,
    state: {
        pages: {
            list: [],
            total: 50
        },
        spaces: {
            list: [],
            total: 50
        },
        curSpace: {
          spaceId: '123',
          spaceName: '前端代码规范'
        },
        pageLoading: true
    },
    actions: {
        getPages({state, dispatch, commit}, payload) {
            return Promise.resolve();
        },
        getSpaces({commit}) {
            return di.getSpaces()
            .then(ret => {
                commit('spaces', ret);
            })
        },
        getSpaceById({commit}, spaceId) {
            return di.getSpaceById(spaceId)
            .then(ret => {
                commit('space', {spaceName: ret.spaceName});
                commit('pages', {list: ret.pages, total: ret.total});
            });
        }
    },
    mutations: {
        space(state, payload) {
            state.curSpace = payload;
        },
        spaces(state, payload) {
            state.spaces = payload;
        },
        pages(state, payload) {
            console.log(payload);
            state.pages = payload;
        },
        pageLoading(state, payload) {
            state.pageLoading = payload;
        },
        rightPanelVisible(state) {
            state.rightPanelVisible = !state.rightPanelVisible;
        },
        searchSpaces(state, list) {
            state.searchSpaces = list;
        }
    }
};
