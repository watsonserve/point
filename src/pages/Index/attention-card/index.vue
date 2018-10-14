<template>
    <div class="card attention-card">
        <div class="title">
            <router-link :to="pageAddress(data.pageId)">
                <i class="icon-font icon-report"></i>
                <h5>{{ data.title }}</h5>
            </router-link>
            <div class="remove">
                <a href="javascript:;" @click="cancelAttention(data)">取消关注</a>
            </div>
        </div>
        <p class="update">
            更新<time>{{ data.updateTime }}</time>
        </p>
        <router-link class="go-detail" :to="pageAddress(data.pageId)">点击阅读详情</router-link>
        <footer>
            <a href="javascript:;" @click="gotoSpaceHome(data.space)">
                <em :class="`random-bg-color-${data.space.bgColor}`">{{ data.space.spaceName[0] }}</em>
                <span>{{ data.space.spaceName }}</span>
            </a>
        </footer>
    </div>
</template>

<script>
import {gotoSpaceHome} from '@/utils';

function pageAddress(pageId) {
    return `/page/${pageId}`;
}

export default {
    name: 'AttentionCard',
    props: ['data'],
    methods: {
        cancelAttention(page) {
            page.updateCare(this.$store.state.userInfo.id);
        },
        pageAddress,
        gotoSpaceHome(space) {
            gotoSpaceHome(this, space);
        }
    }
}
</script>

<style lang="less" scoped>
    @import './attention-card.less';
</style>
