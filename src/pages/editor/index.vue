<template>
  <main class="editor">
    <tool-bar @command="" />
    <article
      class="editing__article"
      contenteditable
      @keyup.enter=""
    >{{ previewContent }}</article>
  </main>
</template>

<script lang="ts">
import MarkdownIt from 'markdown-it';

export default {
  name: 'editor',
  props: {
    spaceId: {
      type: String,
      default: ''
    },
    articleId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      title: '',
      content: ''
    };
  },
  computed: {
    previewContent() {
      return this.md.render(this.content);
    }
  },
  created() {
    this.md = new MarkdownIt();
  }
}
</script>

<style lang="stylus" scoped src="./index.styl" />
