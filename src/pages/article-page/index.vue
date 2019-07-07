<template>
  <main class="detail">
    <left-layout>
      <!-- <left-panel slot="leftPanel" :value="space" /> -->
      <div class="page-content" v-if="article">
        <header class="main-header">
          <h3 class="captain-title">
            {{ article.title }}
            <time class="up-time" v-if="article.updateTime">{{ article.updateTime }}</time>
          </h3>
          <nav v-if="article.tags && article.tags.length">
            <span class="label-text">标签:</span>
            <span class="label" v-for="item in article.tags" :key="item.name">{{ item.name }}</span>
          </nav>
        </header>
        <div class="main-content" ref="artContainer">
          <article class="article" v-html="article.content"></article>
        </div>
      </div>
    </left-layout>
  </main>
</template>

<script>
import {mapActions} from 'vuex';
import LeftLayout from '@/components/LeftLayout';
// import LeftPanel from './left-panel';

export default {
  name: 'article-page',
  components: {LeftLayout},
  props: {
    articleId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      article: {},
      pageInfoVisit: false
    };
  },
  methods: {
    ...mapActions('article', ['getArticleById']),
    loadArticle(id) {
      this.getArticleById(id).then(data => this.article = data);
    }
  },
  created() {
    this.loadArticle(this.articleId);
  },
  watch: {
    articleId(id) {
      this.loadArticle(id);
    }
  }
}
</script>

<style lang="stylus" scoped src="./details.styl" />
