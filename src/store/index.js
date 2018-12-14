import Vue from 'vue';
import Vuex from 'vuex';
import di from '../utils/dataInterface';
import home from './home';
import search from './search';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null,
        userData: {
            notifyMe: 0,
            responseMe: 0,
            praiseMe: 0
        },
        msgList: [],
        msg: ''
    },
    actions: {
        error({dispatch}, err) {
            console.error(err);
            if (typeof err !== 'string') {
                err = '未知异常';
            }

            dispatch('msg', {
                msg: err,
                type: 'error'
            });
        },
        msg({state, dispatch, commit}, msg) {
            let isNone = state.msgList.length < 1;

            commit('msgListPush', msg);

            if (isNone) {
                dispatch('showMsg');
            }
        },
        showMsg({state, dispatch, commit}) {
            let msg = state.msgList[0];

            if (msg) {
                let handle = setTimeout(() => {
                    clearTimeout(handle);

                    commit('msgListPop');
                    if (0 <= state.msgList.length) {
                        dispatch('showMsg');
                    }
                }, 3000);

                commit('msg', msg);
            }
        },
        userInfo({dispatch, commit}) {
            return di.getUserInfo()
            .then(result => {
                commit('userInfo', result);
            })
            .catch(msg => {
                dispatch('error', msg);
            });
        },
        userData({dispatch, commit}) {
            return di.getUserData()
            .then(result => {
                commit('userData', result);
            })
            .catch(msg => {
                dispatch('error', msg);
            });
        }
    },
    mutations: {
        msgListPush(state, payload) {
            state.msgList = [...state.msgList, payload];
        },
        msgListPop(state) {
            state.msgList = state.msgList.slice(1);
        },
        msg(state, msg) {
            state.msg = msg.msg;
        },
        userInfo(state, payload) {
            state.userInfo = payload;
        },
        userData(state, payload) {
            state.userData = payload;
        }
    },
    modules: {
        search,
        home
    }
});
