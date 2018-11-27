<template>
  <div class="left-panel">
    <div class="space-info">
      <em class="point" :class="`random-bg-color-${value.bgColor}`">{{ value.spaceName[0] }}</em>
      <h5 class="space-name">{{ value.spaceName }}</h5>
    </div>
    <ul class="list-unstyled features">
      <li v-for="art in value.articles" :key="art.pageId">
        <router-link class="link" :to="`/article/${art.pageId}`">{{ art.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import {pageAddress} from '@/router';
import PageNode from '../page-node';

export default {
  name: 'left-panel',
  props: {
    value: {
      type: Object,
      default: _ => ({})
    }
  }
}
</script>
<style lang="less" scoped src="./left-panel.less"></style>