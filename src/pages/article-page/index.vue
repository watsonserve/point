<template>
  <main class="detail">
    <LeftLayout>
      <LeftPanel slot="leftPanel" :treeHeight="800" :space="space.spaceName" :pages="pages" />
      <div class="page-content">
        <header class="main-header">
          <h3>
            {{ page.title }}
            <span style="display: inline-block">
              <Dropdown :isList="false">
                <a href="javascript:;"><i class="icon-font icon-exclamation"></i>页面信息</a>
                <DropdownMenu slot="list" class="oaui-case-dropdown-list">
                  <DropdownItem>
                    <div class="page-info">
                      <div class="info-content">
                        <div class="label">
                          <span v-if="page.create.user && page.create.time">创建 : </span>
                          <span v-if="page.update.user && page.update.time">最新修改 : </span>
                        </div>
                        <div class="name">
                          <span v-if="page.create.user && page.create.time">{{ page.create.user }}</span>
                          <span v-if="page.update.user && page.update.time">{{ page.update.user }}</span>
                        </div>
                        <div class="time">
                          <span v-if="page.create.user && page.create.time">{{ page.create.time }}</span>
                          <span v-if="page.update.user && page.update.time">{{ page.update.time }}</span>
                        </div>
                      </div>
                      <footer><a href="javascript:;">页面操作历史</a></footer>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </span>
          </h3>
          <nav class="nav-left">
            <ul class="list-inline">
              <li>
                <router-link class="editor-button nav-item" :to="goEdit()">
                  <i class="icon-font icon-write"></i>编辑
                </router-link>
              </li>
              <li>
                <a href="javascript:;" @click="care">
                  <i class="icon-font icon-add" v-show="!page.cared"></i>{{ page.cared ? "已关注" : "关注"}}
                </a>
              </li>
              <li>
                <a href="javascript:;" @click="favorites">
                  <i :class="['icon-font', page.isFavorites ? 'icon-stared' : 'icon-star']"></i>{{page.isFavorites ? '已收藏':'收藏'}}
                </a>
              </li>
              <li>
                <a href="javascript:;" @click="like">
                  <i class="icon-font icon-good"></i>{{page.praised ? '已点赞':'点赞'}}({{ page.praiseNum }})
                </a>
              </li>
              <li>
                <span class="drop-down-list" style="display: inherit">
                  <Dropdown>
                    <a href="javascript:;"><i class="icon-font icon-share"></i>分享</a>
                    <DropdownMenu slot="list" class="oaui-case-dropdown-list">
                      <DropdownItem><a href="javascript:;">Hi分享</a></DropdownItem>
                      <DropdownItem><a href="javascript:;">邮件分享</a></DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </span>
              </li>
              <li>
                <a href="javascript:;">
                  <i class="icon-font icon-edit"></i>评论
                </a>
              </li>
            </ul>
          </nav>
          <span class="right-span drop-down-list">
            <Dropdown>
              <a href="javascript:;"><i class="icon-font icon-operate"></i>页面操作</a>
              <DropdownMenu slot="list" class="oaui-case-dropdown-list">
                <DropdownItem><a href="javascript:;">复制</a></DropdownItem>
                <DropdownItem><a href="javascript:;">移动</a></DropdownItem>
                <DropdownItem><a href="javascript:;">导出</a></DropdownItem>
                <DropdownItem><a href="javascript:;">删除</a></DropdownItem>
                <DropdownItem><a href="javascript:;">权限设置</a></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </span>
        </header>
        <div class="main-content" ref="artContainer" :style="{height: initHeight.artHeight}">
          <article class="article" >
            <section>
              <div v-html="page.viewContent"></div>
            </section>
              <nav>
                <span class="label-text">{{page.tags.length === 0 && !addTag ? '无标签' : '标签:'}}</span>
                <span :class="{'label': true, 'label-edit': tagsEdit}" v-for="item in page.tags" :key="item.name">
                  {{ item.name }}
                  <i class="icon-font icon-remove" v-show="tagsEdit"></i>
                </span>
                <a href="javascript:;" v-show="tagsEdit" @click="addTag=true"><i class="icon-font icon-add" v-show="!addTag"></i></a>
                <p :class="{'create-tags': true,'create-tags-edit': tagsEdit}">
                  <span v-show="addTag&&tagsEdit" class="label">
                    <input class="tag-input" placeholder="点击创建标签" v-model="newTag"/>
                  </span>
                  <a href="javascript:;" @click="editTags">
                    <i class="icon-font icon-write"></i>
                  </a>
                </p>
              </nav>
          </article>
          <Attachments :cols="attachmentsCols" :list="page.attachments" :header="true" :edit="true" :download="true" :delete="true"/>
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
  computed: {
    ...mapState('home', {
      space(state) {
        return state.curSpace;
      },
      pages(state) {
        return state.pages.list;
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
