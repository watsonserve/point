import * as di from '@/DAL';
import {dateFormat} from '@/utils';

class Article {
  constructor(val) {
    this.title = val.title;
    this.content = val.content;
    this.pageId = val.page_id;
    this.updateTime = dateFormat(1000 * val.update_time);
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
        pre[item.page_id] = new Article(item);
        return pre;
      }, {});
    }
  }
};
