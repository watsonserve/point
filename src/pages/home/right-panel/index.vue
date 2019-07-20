<!-- right panel -->
<template>
  <aside class="rigit-panel" :class="{'visible': value}">
    <a class="fold" href="javascript:;" @click="toggerVisibleHandle"></a>
    <div class="content">
      <h5 class="caption">空间</h5>
      <ul class="spaces list-unstyled">
        <router-link tag="li" class="spaces__item" v-for="item in spaces" :key="item.spaceId" :to="`/space/${item.spaceId}`">
          <a class="space-link">
            <em class="space-point" :class="`random-bg-color-${item.spaceName.charCodeAt() % 7}`">{{ item.spaceName[0] }}</em>
            <h5 class="space-name" :title="item.spaceName">{{ item.spaceName }}</h5>
          </a>
        </router-link>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'right-panel',
  props: {
    spaces: {
      type: Array,
      default: _ => []
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggerVisibleHandle() {
      this.$emit('input', !this.value);
    }
  }
});
</script>

<style lang="stylus" scoped src="./right-panel.styl" />
