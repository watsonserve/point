<template>
  <main class="space-info">
    <aside class="left-panel">
      <div class="space-card">
        <em class="point" :class="`random-bg-color-${bgColor}`">{{ spaceName[0] }}</em>
        <span class="name">{{ spaceName }}</span>
      </div>
      <ul class="list-unstyled">
        <router-link tag="li" :to="`/article/${item.pageId}`" v-for="item in articles" :key="item.pageId">
          <a href="javascript:;">{{ item.title }}</a>
        </router-link>
      </ul>
    </aside>
  </main>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState, mapActions} from 'vuex';

export default Vue.extend({
  name: 'space-info',
  props: {
    spaceId: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('space', {
      space(state) {
        return state.spaces[this.spaceId] || {};
      }
    }),
    spaceName() {
      return this.space.spaceName;
    },
    bgColor() {
      return this.space.bgColor;
    },
    articles() {
      return this.space.articles;
    }
  },
  methods: {
    ...mapActions('space', ['getSpaceById'])
  },
  // created() {
  //   this.getSpaceById(this.spaceId);
  // }
});
</script>

<style lang="less" scoped src="./index.styl" />
