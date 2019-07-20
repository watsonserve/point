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

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'left-panel',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
});
</script>
<style lang="stylus" scoped src="./left-panel.styl"></style>