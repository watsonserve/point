import * as di from '@/DAL';
import {dateFormat} from '@/utils';

class Article {
  constructor(val) {
    Object.keys(val).forEach(key => {
      this[key] = val[key];
    });
    this.updateTime = dateFormat(1000 * val.updateTime);
  }
}

export default {
  namespaced: true,
  state: {
    articles: {}
  },
  actions: {
    add() {},
    del() {},
    update() {},
    getArticleById(_, articleId) {
      return di.getArticleById(articleId)
      .then(ret => new Article(ret.article));
    },
    getAllArticles({commit}, {offset, limit}) {
      return di.getArticles(offset, limit)
      .then(ret => {
        commit('articles', ret.list);
      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  mutations: {
    articles(state, payload) {
      state.articles = payload.reduce((pre, item) => {
        pre[item.pageId] = new Article(item);
        return pre;
      }, {});
    }
  }
};
