export default {
    namespaced: true,
    state: {
        suggest: {
            history: [],
            hot: [],
            hotImg: []
        }
    },
    actions: {
        getSuggest({state, rootState, dispatch, commit}, word) {
            console.log(word);
            return Promise.resolve();
        },
        query({state, rootState, dispatch, commit}, word) {
            console.log(word);
            return Promise.resolve();
        }
    },
    mutations: {
    }
};
