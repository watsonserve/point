<template>
  <main class="editor">
    <section class="editing">
      <v-text-field v-model="title" placeholder="标题" />
      <v-textarea v-model="content" :no-resize="true" />
    </section>
    <section class="previewing">
      <h3>{{ title }}</h3>
      <article class="previewing__article" editable>{{ previewContent }}</article>
    </section>
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
