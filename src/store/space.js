import * as di from '@/DAL';

class Space {
  spaceId = 'undefined-space-id';
  spaceName = '未知空间';
  bgColor = NaN;
  articles = [];

  constructor(val) {
    this.spaceId = val.space_id;
    this.spaceName = val.space_name;
    this.articles = val.articles;
    this.bgColor = val.space_name.charCodeAt() % 7;
  }
}

export default {
  namespaced: true,
  state: {
    spaces: {}
  },
  actions: {
    add() {},
    del() {},
    update() {},
    getSpaceById(_, spaceId) {
      return di.getSpaceById(spaceId)
      .then(ret => new Space(ret));
    },
    getAllSpaces({commit}) {
      return di.getSpaces()
      .then(ret => {
        commit('spaces', ret.list);
      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  mutations: {
    spaces(state, payload) {
      state.spaces = payload.reduce((pre, item) => {
        pre[item.space_id] = new Space(item);
        return pre;
      }, {});
    }
  }
};
