<template>
  <div class="viewport">
    <div id="app">
      <public-header />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PublicHeader from '@/components/public-header/index.vue';

export default Vue.extend({
  name: 'app',
  components: { PublicHeader }
});
</script>

<style lang="stylus" src="./assets/style/layout.styl"></style>
