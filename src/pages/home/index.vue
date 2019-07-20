<template>
  <main :class="['index', rightPanelVisible ? 'part-width' : 'full-width']">
    <section>
      <div class="content" ref="content">
        <div class="cards">
          <ul class="list-unstyled list-inline attention">
            <li class="animated" v-for="item in articles" :key="item.ariticleId">
              <attention-card :data="item" />
            </li>
          </ul>
        </div>
        <public-footer />
      </div>
    </section>
    <right-panel v-model="rightPanelVisible" :spaces="spaces" />
  </main>
</template>

<script lang="ts">
import {mapState, mapActions} from 'vuex';
import PublicFooter from '@/components/public-footer';
import RightPanel from './right-panel';
import AttentionCard from './attention-card';

export default {
  name: 'home',
  components: { PublicFooter, RightPanel, AttentionCard },
  data() {
    return {
      errno: 0,
      errmsg: '未初始化',
      rightPanelVisible: true
    }
  },
  computed: {
    ...mapState('space', {
      spaces(state) {
        const spaces = state.spaces;
        return Object.keys(spaces).map(key => spaces[key]);
      }
    }),
    ...mapState('article', {
      articles(state) {
        const articles = state.articles;
        return Object.keys(articles).map(key => articles[key]);
      }
    })
  },
  methods: {
    ...mapActions('space', ['getAllSpaces']),
    ...mapActions('article', ['getAllArticles'])
  },
  created() {
    this.getAllArticles({offset: 0, limit: 50});
    this.getAllSpaces();
  }
}
</script>

<style lang="stylus" scoped src="./index.styl" />
