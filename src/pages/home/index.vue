<template>
  <main :class="['index', rightPanelVisible ? 'part-width' : 'full-width']">
    <section>
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
    <right-panel v-model="rightPanelVisible" :spaces="spaces" />
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import PublicFooter from '@/components/public-footer';
import RightPanel from './right-panel';

export default {
  name: 'home',
  components: {PublicFooter, RightPanel},
  data () {
    return {
      errno: 0,
      errmsg: '未初始化',
      rightPanelVisible: true
    }
  },
  computed: {
    ...mapState('home', {
      spaces(state) {
        return state.spaces.list;
      }
    })
  },
  methods: {
    ...mapActions('home', ['getSpaces'])
  },
  created() {
    this.getSpaces();
  }
}
</script>

<style lang="stylus" scoped src="./index.styl" />
