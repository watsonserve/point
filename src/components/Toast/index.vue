<template>
    <div :data-msg="msg"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Toast',
  props: ['msg'],
  watch: {
    msg() {
      this.$Message.error(this.msg);
    }
  }
});
</script>
