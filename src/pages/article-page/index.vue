<template>
  <main class="detail">
    <LeftLayout>
      <left-panel slot="leftPanel" :value="space" />
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
    </LeftLayout>
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import LeftLayout from '@/components/LeftLayout';
import LeftPanel from './left-panel';

export default {
  name: 'article-page',
  components: {LeftLayout, LeftPanel},
  props: {
    articleId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pageInfoVisit: false
    };
  },
  computed: {
    ...mapState('home', {
      space(state) {
        return state.curSpace;
      },
      article(state) {
        return state.curArticle;
      }
    })
  },
  methods: {
    ...mapActions('home', ['getArticleById'])
  },
  created() {
    this.getArticleById(this.articleId);
  }
}
</script>

<style lang="less" scoped src="./details.less" />
