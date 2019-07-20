<template>
  <div class="viewport">
    <div id="app">
      <public-header />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import PublicHeader from '@/components/public-header';

export default {
    name: 'app',
    components: {PublicHeader}
}
</script>

<style lang="stylus" src="./assets/style/layout.styl"></style>
