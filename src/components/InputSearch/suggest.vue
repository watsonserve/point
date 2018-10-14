<template>
  <div class="associate">
    <div class="block" v-if="associateData.isDefault">
      <header>
        <span class="title">{{associateData.body[0].title}}</span>
        <a class="delete" href="javascript:;">
          <i class="icon-font icon-delete"></i>
          清除历史
        </a>
      </header>
      <main>
        <a class="tag" href="javascript:;" v-for="(item, idx) in associateData.body[0].children" :key="idx" @click="selectItem">{{item}}</a>
      </main>
    </div>
    <div class="block" v-if="associateData.isDefault">
      <header>
        <span class="title">{{associateData.body[1].title}}</span>
      </header>
      <main>
        <a class="tag" href="javascript:;" v-for="(item, idx) in associateData.body[1].children" :key="idx" @click="selectItem">{{item}}</a>
      </main>
    </div>
    <div class="block" v-if="associateData.isDefault">
      <header>
        <span class="title">{{associateData.body[2].title}}</span>
      </header>
      <main>
        <a @click="selectItem" class="img-container" href="javascript:;" v-for="(item, idx) in associateData.body[2].children" :key="idx" :style="{'background-image': 'url('+item.img+')'}">
          <p class="text">{{item.title}}</p>
        </a>
      </main>
    </div>
    <div class="block page" v-if="!associateData.isDefault">
      <header>
        <span class="title">{{associateData.body[0].title}}</span>
      </header>
      <main class="result-main">
        <p class="item" v-for="(item, idx) in associateData.body[0].children" :key="idx" @click="selectItem">
          <i class="icon-font icon-report"></i>
          <span class="text" v-html="searchResultHightLight(item, associateData.keywords)"></span>
        </p>
      </main>
    </div>
    <div class="block space" v-if="!associateData.isDefault">
      <header>
        <span class="title">{{associateData.body[1].title}}</span>
      </header>
      <main class="result-main">
        <p class="item" v-for="(item, idx) in associateData.body[1].children" :key="idx" @click="selectItem">
          <em :class="`random-bg-color-${item.spaceId%7}`" v-if="!item.logo">{{item.spaceName[0]}}</em>
          <img v-if="item.logo" :src="item.logo" />
          <span class="text" v-html="searchResultHightLight(item.title, associateData.keywords)"></span>
        </p>
      </main>
    </div>
    <div class="block user" v-if="!associateData.isDefault">
      <header>
        <span class="title">{{associateData.body[2].title}}</span>
      </header>
      <main class="result-main">
        <p class="item" v-for="(item, idx) in associateData.body[2].children" :key="idx" @click="selectItem">
          <i class="icon-font icon-person"></i>
          <span class="text" v-html="searchResultHightLight(item, associateData.keywords)"></span>
        </p>
      </main>
    </div>
    <footer v-if="!associateData.isDefault">
      <a href="javascript:;">查看全部搜索结果</a>
    </footer>
  </div>
</template>

<script>
import {getDefaultData, getNormalData} from './data';
import {mapState} from 'vuex';

const defaultData = getDefaultData()
const normalData = getNormalData()

export default {
  name: 'suggest-modal',
  computed: {
    ...mapState('search', {
      associateData(state) {
        if (!state.suggest.history.length) {
          return {
            isDefault: true,
            body: [
              {
                title: '搜索历史',
                children: defaultData.history
              },
              {
                title: '热搜',
                children: defaultData.hot
              },
              {
                title: '热搜',
                children: defaultData.hotImg
              }
            ]
          }
        }

        return state.suggest;
      }
    })
  },
}
</script>
<style lang="stylus" scoped src="./suggest.styl" />
