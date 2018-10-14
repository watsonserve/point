/**
 * @file 详情页
 * @author wutong<wutong19@baidu.com>
 */

import Page from '@/dataObject/Page';
import di from '@/dataObject/dataInterface';

function findNode({tree}, id) {
    let node = {};

    id.forEach(n => {
        node = tree[parseInt(n, 10)];
    });

    return node;
}

export default {
    namespaced: true,
    state: {
        page: null
    },
    modules: {
        leftPanel: {
            namespaced: true,
            state: {
                space: null,
                tree: []
            },
            mutations: {
                changeName(state, {id, pageId, title}) {
                    // id = id.split('-');
                    // const node = findNode(state, id);
                    // node.title = title;
                },
                deleteNode(state, {id}) {
                    id = id.split('-');
                    const index = id.pop();
                    const node  = findNode(state, index);
                    const tree = state.tree;
                    tree.splice(parseInt(index, 10), 1);
                },
                attendNode(state, {id}) {
                    id = id.split('-');
                    const node = findNode(state, id);

                    if (!node.childPage) {
                        node.childPage = [];
                    }
                }
            }
        }
    },
    actions: {
        page({state, dispatch, commit, rootState}, pageId) {
            const page = Page.newPage(pageId);

            return page.load(rootState.userInfo.id, msg => {
                dispatch('error', msg, {root: true});
            })
                .then(() => {
                    return page.space.load(msg => {
                        dispatch('error', msg, {root: true});
                    });
                })
                .then(() => {
                    commit('page', page);
                })
                .catch(msg => {
                    dispatch('error', msg, {root: true});
                });
        },
        addTags({state, dispatch, commit, rootState}, {pageId, tagName}) {
            return di.addTags(pageId, rootState.userInfo.id, tagName)
            .catch(msg => {
                dispatch('error', msg, {root: true});
            });
        },
        getGoodCount({state, dispatch, commit, rootState}) {
            return this.page.updatePraise(rootState.userInfo.id)
            .catch(msg => {
                dispatch('error', msg, {root: true});
            });
        },
        addLikes({state, dispatch, commit, rootState}) {
            return this.page.updateFavorite(rootState.userInfo.id)
            .catch(msg => {
                dispatch('error', msg, {root: true});
            });
        },
        addComment({state, dispatch, commit}, payload) {
            return di.addComment(payload)
            .catch(msg => {
                dispatch('error', msg, {root: true});
            });
        },
        deleteComment({state, dispatch, commit}, payload) {
            return di.deleteComment(payload)
            .catch(msg => {
                dispatch('error', msg, {root: true});
            });
        }
    },
    mutations: {
        page(state, page) {
            state.page = page;
        }
    }
};
