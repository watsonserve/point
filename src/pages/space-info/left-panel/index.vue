<template>
  <div class="left-panel">
    <div class="space-card">
      <em class="point" :class="`random-bg-color-${space.charCodeAt() % 7}`">{{ space[0] }}</em>
      <span class="name">{{ space }}</span>
    </div>
    <div class="features">
      <div class="panel-search">
        <v-autocomplete
          class="search"
          append-icon="search"
          placeholder="搜索页面"
        />
      </div>
      <div class="tree-container">
        <ul class="list-unstyled">
          <router-link tag="li" :to="`/page/${item.pageId}`" v-for="item in pages" :key="item.pageId">
            <a href="javascript:;">{{ item.title }}</a>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {pageAddress} from '@/router';
import PageNode from '../page-node';

export default {
  name: 'left-panel',
  props: {
    space: {
      type: String,
      default: 'null'
    },
    pages: {
      type: Array,
      default: _ => []
    }
  }
}
</script>

<style lang="less" scoped src="./left-panel.less" />
<style lang="less" scoped src="./tree.less" />
