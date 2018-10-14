/**
 * @file editor.js
 * @author liuhui
 */

import di from '../dataObject';
export default {
    namespaced: true,
    state: {
        data: {}
    },
    actions: {
        startEditPage({state, dispatch, commit}, {pageId, spaceId, parentId, beforePageId, creator}) {
            di.startEditPage({
                pageId,
                spaceId,
                parentId,
                beforePageId,
                creator
            }).then(function (data) {
                console.log(data);
            });
        },
        saveDraftPage({state, dispatch, commit}, {pageId, title, body, creator}) {
            di.saveDraftPage({
                pageId,
                title,
                body,
                creator
            });
        },
        savePage({state, dispatch, commit}, {pageId, title, body, creator}) {
            di.savePage({
                pageId,
                title,
                body,
                creator
            });
        }

    },
    mutations: {

    }
};
