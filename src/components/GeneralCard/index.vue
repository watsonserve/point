<template>
    <div class="card general-card">
        <a class="remove" href="javascript:;" v-on:click="remove">
            <i class="icon-font icon-remove"></i>
        </a>
        <h5>
            <i class="icon-font icon-report"></i>
            <router-link :to="`/page/${data.pageId}.do`">{{ data.title }}</router-link>
            <a class="attention" href="javascript:;" v-on:click="care(data.pageId)">
                <i class="icon-font icon-add"></i>
                <span>关注</span>
            </a>
        </h5>
        <p class="update">更新 {{ data.updateUser }} {{ Date.format(new Date(data.updateTime)) }}</p>
        <footer>
            <a href="javascript:;" v-on:click="gotoSpaceHome(data.spaceId)">
                <em :class="`random-bg-color-${data.randomColor}`">{{ data.spaceName[0] }}</em>
                <span>{{ data.spaceName }}</span>
            </a>
        </footer>
    </div>
</template>

<script lang="ts">
import {gotoSpaceHome} from '@/utils';


export default {
    name: 'GeneralCard',
    props: ['data'],
    methods: {
        care (pageId) {
            this.$store.dispatch('page/care', {
                status: 1,
                pageId: pageId
            });
        },
        remove () {},
        gotoSpaceHome(spaceId) {
            gotoSpaceHome(this, spaceId);
        }
    }
}
</script>

<style lang="less" scoped>
    @import './general-card.styl';
</style>
