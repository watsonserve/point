<template>
    <p :class="['page-node', {'hoverd': editable}]" :title="data.title">
        <a v-if="data.childPage && data.childPage.length" class="expand" href="javascript:;" @click.stop="expand">
            <i :class="['icon-font', `icon-arrow-${isExpand ? 'down' : 'right'}`]"></i>
        </a>
        <span class="page-title">
            <router-link :class="['text', {highlight: highlight}]" v-if="!editable" :to="pageAddress(data.pageId)">{{ data.title }}</router-link>
            <input type="text" :class="{hide: !editable}" v-model="inputTitle" @blur="handlerBlur" ref="nameput" />
        </span>
        <span class="options">
            <a href="javascript:;" class="icon" @click="editName">
                <i class="icon-font icon-write" />
            </a>
            <a href="javascript:;" class="icon" @click="deleteNode">
                <i class="icon-font icon-delete" />
            </a>
            <a href="javascript:;" class="icon" @click="addNode">
                <i class="icon-font icon-attend" />
            </a>
        </span>
    </p>
</template>

<script>
/**
* @file node content
*/

import {pageAddress} from '@/router';

export default {
    name: 'PageNode',
    data() {
        return {
            inputTitle: '',
            editable: false
        }
    },
    props: {
        expand: {
            type: Function
        },
        isExpand: {
            type: Boolean
        },
        data: {
            type: Object,
            required: true
        }
    },
    computed: {
        highlight() {
            this.expand(false);
            return parseInt(this.data.pageId) === parseInt(this.$route.query.pageId);
        }
    },
    methods: {
        pageAddress: pageAddress,
        addNode() {
        },
        editName() {
            this.inputTitle = this.data.title;
            this.editable = true;
            let handle = setTimeout(() => {
                clearTimeout(handle);
                this.$refs.nameput.focus();
            }, 0);
        },
        handlerBlur() {
            this.editable = false;
            this.data.renamePage(this.inputTitle);
        },
        deleteNode() {
            this.data.dropPage();
        }
    }
};
</script>

<style lang="less">
@import './page-node.less';
</style>
