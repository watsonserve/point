<template>
  <main class="space-info">
    <div class="space-card">
      <em class="point" :class="`random-bg-color-${bgColor}`">{{ spaceName[0] }}</em>
      <span class="name">{{ spaceName }}</span>
    </div>
    <ul class="list-unstyled">
      <router-link tag="li" :to="`/article/${item.pageId}`" v-for="item in articles" :key="item.pageId">
        <a href="javascript:;">{{ item.title }}</a>
      </router-link>
    </ul>
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'space-info',
  props: {
    spaceId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('home', {
      spaceName(state) {
        return state.curSpace.spaceName;
      },
      bgColor(state) {
        return state.curSpace.bgColor;
      },
      articles(state) {
        return state.curSpace.articles;
      }
    })
  },
  methods: {
    ...mapActions('home', ['getSpaceById'])
  },
  created() {
    this.getSpaceById(this.spaceId);
  }
}
</script>

<style lang="less" scoped src="./index.less" />
