<template>
  <main :class="['index', rightPanelVisible ? 'part-width' : 'full-width']">
    <section v-on:scroll="loadPage">
      <div class="content" ref="content">
        <div class="cards">
          <ul class="list-unstyled list-inline attention">
            <li class="animated" v-for="item in pages" :key="item.pageId">
              <attention-card :data="item" />
            </li>
          </ul>
        </div>
        <public-footer />
      </div>
    </section>
    <right-panel v-model="rightPanelVisible" :spaces="spaceLists" />
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import PublicFooter from '@/components/PublicFooter';
import RightPanel from './right-panel';
import AttentionCard from './attention-card';

export default {
  name: 'Index',
  components: {PublicFooter, AttentionCard, RightPanel},
  data () {
    return {
      errno: 0,
      errmsg: '未初始化',
      rightPanelVisible: true
    }
  },
  computed: {
    ...mapState('home', {
      pageLoading(state) {
        return state.pageLoading;
      },
      pages(state) {
        return state.pages.list;
      },
      spaceLists(state) {
        return state.spaces.list;
      }
    })
  },
  methods: {
    ...mapActions('home', ['getSpaces', 'getPages']),
    fetchPageList(reset) {
      this.getPages({reset});
    },
    loadPage(e) {
      if (!this.pageLoading && e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
        this.fetchPageList();
      }
    }
  },
  created() {
    this.getSpaces();
    // this.fetchPageList(true);
  }
}
</script>

<style lang="stylus" scoped src="./index.styl" />
