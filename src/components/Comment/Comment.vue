<template>
    <li id="comment" >
        <a href="javascript:;" class="head">
            <img src="./head.png"/>
        </a>
        <span class="comment-content">
            <span class="name">
                <a href="javascript">
                    {{ commentData.name }}
                </a>
            </span>
            <span>:</span>
            <span class="comment-text">
                <span v-if="commentData.isDoubleReply">
                    {{'回复'}}
                    <a class="name" href="javascript:;">{{commentData.parentName}}</a>
                </span>
                {{ commentData.comment }}
            </span>
        </span>
        <span class="operate">
            <span class="time">{{ updateTime }}</span>
            <a class="reply" href="javascrpt:;" @click="isReply = true">
                <i class="icon-font icon-reply"></i>
                回复
            </a>
            <a class="delete" href="javascrpt:;" v-show="isCreator" @click="deleteComment">
                <i class="icon-font icon-delete"></i>
                删除
            </a>
        </span>
        <p class="reply-text" v-show="isReply">
            <textarea-box
                :limit="400"
                :placeholder="'回复 ' + commentData.userName + ' :'"
                :isChild="true"
                :parentId="this.commentData.id"
                defaultText="输入邮箱前缀或姓名"
                selectTip="选择同事或按空格完成"
                fileTip="本地上传 (小于2M的jpg,gif,png,bmp，最多5张)"
                @close="isReply = false"
            />
        </p>
        <template>
            <ul v-if="typeof commentData.childPage[0] !== 'undefined'" :class="{'reply-container': true, 'd-reply-container': isDoubleReply}">
                <CommentNode v-for="(item, index) in replyComments" :commentData="item" :key="index"/>
            </ul>
            <p v-if="childNum > 5 && !showAll" class="read-more">
                {{`还有${childNum-5}条评论`}}
                <a href="javascrpt:;" @click="showAll=true">查看更多</a>
            </p>
        </template>
    </li>
</template>

<script lang="ts">
import {dateUpdate} from '@/utils';
import TextareaBox from './Textarea.vue';

export default {
    name: 'CommentNode',
    props: ['commentData'],
    components: { TextareaBox },
    computed: {
        updateTime: function () {
            return dateUpdate(new Date(this.commentData.createTime));
        },
        isCreator: function () {
            const loginerName = this.$store.state.userInfo.name;
            return loginerName === this.commentData.name;
        },
        isDoubleReply: function() {
            return this.commentData.parentId !== 0
        },
        replyComments: function() {
            const childComments = []
            function _deeplySearch(arr, payload={}) {
                arr.map((item) => {
                    let newItem = Object.assign({}, item, payload);
                    newItem.childPage = [];
                    childComments.push(newItem);

                    if (typeof item.childPage[0] !== 'undefined') {
                        _deeplySearch(item.childPage, {parentName: item.name, isDoubleReply: true});
                    }
                })
            }
            _deeplySearch(this.commentData.childPage);
            this.childNum = childComments.length;
            if (this.showAll) {
                return childComments;
            }

            return childComments.slice(0, 5);
        }
    },
    data() {
        return {
            isReply: false,
            showAll: false,
            childNum: 0
        }
    },
    methods: {
        deleteComment() {
            const pageId = this.$route.query.pageId;
            const commentId = this.commentData.id;

            this.$store.dispatch('detail/deleteComment', {pageId, commentId});
        }
    }
}
</script>

<style lang="less" scoped>
    #comment {
        list-style: none;
        margin-top: 25px;
        overflow: hidden;

        .head {
            float: left;
            margin-right: 8px;

            img {
                display: inline-block;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid #93a1c0;
            }
        }

        .comment-content, .operate {
            display: block;
        }

        .comment-content {
            .name {
                margin-right: 2px;
                a {
                    color: #4786ff;
                    font-weight: bold;
                }
            }

            .comment-text {
                margin-left: 5px;
                .name;
            }
        }

        .operate {
            font-size: 12px;
            vertical-align: middle;

            .time, .reply, .delete {
                color: #7b8bac;

                i {
                    margin-top: -1px;
                }
            }

            a:hover {
                color: #4786ff;
            }
        }

        .reply-text ,.reply-container {
            padding-left: 50px;
            margin-top: 20px;
        }

        .d-reply-container {
            padding-left: 0;
        }

        .read-more {
            font-size: 12px;
            padding-left: 100px;
            color: #7b8bac;

            a {
                color: #4786ff;
                text-decoration: underline;;
            }
        }
     }
</style>
