<template>
  <main class="editor">
    <v-text-field v-model="title" placeholder="标题" />
    <article class="editing__article" contenteditable>{{ previewContent }}</article>
  </main>
</template>

<script>
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
