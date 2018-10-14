<template>
  <main class="detail">
    <LeftLayout>
      <left-panel slot="leftPanel" :treeHeight="800" :space="space.spaceName" :pages="pages" />
      <div class="page-content" v-if="page">
        <header class="main-header">
          <h3>
            {{ page.title }}
            <v-menu v-model="pageInfoVisit" :close-on-content-click="false" offset-x :nudge-right="10">
              <span slot="activator">
                <i class="material-icons">info</i>页面信息
              </span>
              <v-card class="page-info">
                <div class="info-content">
                  <div class="label">
                    <span v-if="page.createTime">创建 : </span>
                    <span v-if="page.updateTime">最新修改 : </span>
                  </div>
                  <div class="time">
                    <span v-if="page.createTime">{{ page.createTime }}</span>
                    <span v-if="page.updateTime">{{ page.updateTime }}</span>
                  </div>
                </div>
              </v-card>
            </v-menu>
          </h3>
          <nav>
            <span class="label-text">{{ page.tags && page.tags.length ? '标签:' : '无标签' }}</span>
            <span class="label" v-for="item in page.tags" :key="item.name">{{ item.name }}</span>
          </nav>
        </header>
        <div class="main-content" ref="artContainer">
          <article class="article">
            <section>
              <div v-html="page.viewContent"></div>
            </section>
          </article>
          <!--Attachments
            :cols="attachmentsCols" :list="page.attachments" :header="true" :edit="true" :download="true" :delete="true"
          /-->
        </div>
      </div>
    </LeftLayout>
  </main>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import LeftLayout from '@/components/LeftLayout';
import LeftPanel from './left-panel';
import Attachments from '@/components/Attachments';

export default {
  name: 'space-info',
  components: {LeftLayout, LeftPanel, Attachments},
  data() {
    return {
      pageInfoVisit: false
    };
  },
  computed: {
    ...mapState('home', {
      space(state) {
        return state.curSpace;
      },
      pages(state) {
        return state.pages.list;
      },
      page(state) {
        return state.pages.list[0];
      }
    })
  },
  methods: {
    ...mapActions('home', ['getSpaceById'])
  },
  created() {
    this.getSpaceById(this.$route.params.spaceId);
  }
}
</script>

<style lang="less" scoped src="./details.less" />
