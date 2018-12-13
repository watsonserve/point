<template>
  <main class="editor">
    <section>
      <v-text-field v-model="title" placeholder="标题" />
      <v-textarea v-model="content" :no-resize="true" />
    </section>
  </main>
</template>

<script>
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
  }
}
</script>

<style lang="stylus" scoped src="./index.styl" />
