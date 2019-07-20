<template>
  <div class="card attention-card">
    <div class="title">
      <router-link :to="`/article/${data.pageId}`">
        <i class="icon-font icon-report"></i>
        <h5>{{ data.title }}</h5>
      </router-link>
    </div>
    <p class="update">
      更新<time>{{ data.updateTime }}</time>
    </p>
    <router-link class="go-detail" to="/">点击阅读详情</router-link>
    <!-- <footer>
      <a href="javascript:;" @click="gotoSpaceHome(data.space)">
        <em :class="`random-bg-color-${data.space.bgColor}`">{{ data.space.spaceName[0] }}</em>
        <span>{{ data.space.spaceName }}</span>
      </a>
    </footer> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'AttentionCard',
  props: ['data'],
  methods: {
  }
});
</script>

<style lang="stylus" scoped src="./attention-card.styl"></style>
